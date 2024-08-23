"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";
import MaterialModal from "@/components/material-modal";
import Select from "react-select";
import { customerStatuses } from "@/modules/customers/domain/customer.constants";
import { Customer, defaultCustomer } from "@/modules/customers/domain/customer";
import { Input } from "@/components/ui/input";
import Item, { defaultItem, mapItems } from "@/modules/items/domain/item";
import { Autocomplete, capitalize, CircularProgress, TextField } from "@mui/material";
import { searchItemsWithFilter } from "@/modules/items/domain/items.actions";
import { useUserContext } from "@/provider/user.provider";
import toast from "react-hot-toast";
import { translate } from "@/lib/utils";
import { useLanguageContext } from "@/provider/language.provider";
import { itemTypes } from "@/modules/items/domain/item.constants";
import { AssetsContext, useAssetsContext } from "@/provider/assets.provider";
import { Asset, defaultAsset } from "@/modules/assets/domain/asset";
import { CleaveInput } from "@/components/ui/cleave";
import { DatePicker } from "@mui/x-date-pickers";

const styles = {
    option: (provided: any, state: any) => ({
      ...provided,
      fontSize: "14px",
    }),
};

let activeTimeout:any = null;

const AddItem = ({ open, onClose }
  :
  { open:boolean, onClose:() => void }
) => {
  const [isPending, startTransition] = useTransition();
  const [customer, setCustomer] = useState<Customer>(defaultCustomer);
  const [item, setItem] = useState<Item>(defaultItem);
  const [loading, setLoading] = useState<boolean>(false);
  const [asset, setAsset] = useState<Asset>(defaultAsset);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputDisabled, setInputDisabled] = useState(false);
  const [itemOptions, setItemOptions] = useState<Item[]>([]);
  const {accessToken} = useUserContext();
  const {trans} = useLanguageContext();
  const {items, setItems, assets, setAssets} = useAssetsContext();

    const fetchItems = async (query:string, filter:object) => {
        try {
            let res = await searchItemsWithFilter(accessToken, query, filter, 1);
            let items = mapItems(res);
            let itemOpts:Item[] = [];
            items.map( item => itemOpts.push(item));
            setItemOptions(itemOpts);
            setLoading(false);
        } catch {
            toast.error(translate("something_wrong", trans));
            setLoading(false);
        }
    }

    const handleChange = (query:string) => {
        setItem({ ...item, id: "", name: query });
        if (query === "")
            setInputDisabled(false);

        if (activeTimeout) {
            clearTimeout(activeTimeout);
        }
        
        activeTimeout = setTimeout(() => {
            handleSearch(query);
        }, 1000);
    }

    useEffect( () => {
        if (accessToken === "")
            return;

        fetchItems("", {});
    }, [accessToken])

    useEffect( () => {
        if (item.id !== "")
            setInputDisabled(true);

        if (item.id === "")
            setInputDisabled(false);
    }, [item.id])

    const handleSearch = (query:string) => {   
        if (query.length > 1 && query.length <= 3)
            return;

        setSearchQuery(query);
        setLoading(true);
        fetchItems(query, {});
    }

  const handleConfirm = async (itm:Item) => {
    asset.item = itm;
    asset.total = asset.unit_cost * asset.quantity;
    setAssets([...assets, asset]);
    setItem(defaultItem);
    setAsset(defaultAsset);
    setInputDisabled(false);
    onClose();
  }

  const handleOptClick = (value:string) => {
    let itm = itemOptions.find( item => item.name === value);
    
    if (typeof(itm) === 'undefined')
        return;
    
    setItem({ ...item, id: itm.id, name: itm.name, sku: itm.sku, unit: itm.unit, price: itm.price, type: itm.type });
    setAsset({ ...asset, unit: itm.unit, unit_cost: itm.price, type: itm.type });
  }

  return (
    <MaterialModal
        open={open}
        onClose={onClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        >
        <h2 id="child-modal-title" className="mb-4 text-xl font-bold">Sales Payment</h2>
        <form onSubmit={ e => { e.preventDefault(); startTransition(() => handleConfirm(item))} }>
            <div className="grid-cols-1 gap-5 space-y-4 overflow-y-auto">
                <div className="flex flex-col gap-2">
                    <Label>Name</Label>
                    <Autocomplete
                        id="free-solo-demo"
                        freeSolo
                        options={itemOptions.map( (option) => option.name)}
                        onInputChange={(event: any, newValue: string | null) => { if (newValue === "") setInputDisabled(false) }}
                        onChange={(event: any, newValue: string | null) => {
                            let val = newValue? newValue : "";
                            handleOptClick(val);
                        }}
                        renderInput={(params) => 
                            <TextField {...params} 
                                required
                                onChange={ e => handleChange(e.target.value)}
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
                                    ),
                                }}
                                />}
                        />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>SKU</Label>
                    <Input  
                        required
                        disabled={inputDisabled}
                        value={item.sku} 
                        onChange={ e => setItem({ ...item, sku: e.target.value })} 
                        type="text" 
                        placeholder="SKU (e.g. MED0001)" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Quantity</Label>
                    <Input  
                        required
                        value={asset.quantity} 
                        onChange={ e => setAsset({ ...asset, quantity: parseInt(e.target.value) })} 
                        type="number"
                        min={1} 
                        placeholder="Quantity" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Unit</Label>
                    <Input 
                        required
                        disabled={inputDisabled}
                        value={asset.unit} 
                        onChange={ e => setAsset({ ...asset, unit: e.target.value })} 
                        type="text" 
                        placeholder="Unit (e.g. kg, gram, tablet, piece)" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Unit Cost</Label>
                    <CleaveInput
                        id="nu"
                        required
                        options={{ numeral: true }}
                        value={asset.unit_cost}
                        placeholder="10,000"
                        onChange={ e => { setAsset({ ...asset, unit_cost: parseFloat(e.target.value.replace(/,/g, '')) }); }} 
                        />
                </div>
                <div className="flex flex-col gap-2 mt-4 overflow-y-visible">
                    <Label>Type</Label>
                    <div>
                        <Select
                            required
                            isDisabled={inputDisabled}
                            className="react-select"
                            classNamePrefix="select"
                            value={ { value: item.type, label: capitalize(item.type) } }
                            onChange={ e => { setAsset({ ...asset, type: e?.value? e.value:'' }); setItem({ ...item, type: e?.value? e.value:'' }) } }
                            defaultValue={itemTypes[0]}
                            options={itemTypes}
                            styles={styles}
                            />
                    </div>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                    <Label>Lifetime/Expiry</Label>
                    <div>
                        <DatePicker 
                            className="w-full border border-default-200 focus:border-primary focus:outline-none h-10 rounded-md px-2 placeholder:text-default-600"
                            onChange={ e => { setAsset({ ...asset, lifetime: e? e.toDate() : new Date() }); }}
                            views={['year', 'month', 'day']}
                            slotProps={{
                                popper: {
                                sx: {zIndex: 10000}
                                },
                            }}
                            />
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-4 gap-3">
                <Button type="button" onClick={() => onClose()} variant="outline">
                    Cancel
                </Button>
                <Button 
                    type="submit"
                    className={isPending ? "pointer-events-none" : ""}
                    >
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isPending ? "Loading.." : "Continue"}
                </Button>
            </div>
        </form>
    </MaterialModal>
  );
};

export default AddItem;