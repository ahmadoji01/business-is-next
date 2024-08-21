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
import { useAssetsContext } from "@/provider/assets.provider";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [inputDisabled, setInputDisabled] = useState(false);
  const [itemOptions, setItemOptions] = useState<Item[]>([]);
  const {accessToken} = useUserContext();
  const {trans} = useLanguageContext();
  const {items, setItems} = useAssetsContext();

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
        setItem({ ...item, id: "" });    
        if (query.length > 1 && query.length <= 3)
            return;

        setSearchQuery(query);
        setLoading(true);
        fetchItems(query, {});
    }

  const handleConfirm = async (itm:Item) => {
    setItems([...items, itm]);
    onClose();
  }

  const handleOptClick = (value:string) => {
    let itm = itemOptions.find( item => item.name === value);
    
    if (typeof(itm) === 'undefined')
        return;
    
    setItem({ ...item, id: itm.id, name: itm.name, sku: itm.sku, unit: itm.unit, price: itm.price, type: itm.type });
  }

  return (
    <MaterialModal
        open={open}
        onClose={onClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        >
        <h2 id="child-modal-title" className="mb-4 text-xl font-bold">Sales Payment</h2>
            <div className="grid-cols-1 gap-5 space-y-4 overflow-y-scroll">
                <div className="flex flex-col gap-2">
                    <Label>Name</Label>
                    <Autocomplete
                        id="free-solo-demo"
                        freeSolo
                        options={itemOptions.map( (option) => option.name)}
                        onChange={(event: any, newValue: string | null) => {
                            let val = newValue? newValue : "";
                            handleOptClick(val);
                        }}
                        renderInput={(params) => 
                            <TextField {...params} 
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
                        disabled={inputDisabled}
                        value={item.sku} 
                        onChange={ e => setItem({ ...item, sku: e.target.value })} 
                        type="number" 
                        placeholder="SKU (e.g. MED0001)" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Quantity</Label>
                    <Input  
                        value={item.stock} 
                        onChange={ e => setItem({ ...item, stock: parseInt(e.target.value) })} 
                        type="number"
                        min={0} 
                        placeholder="Quantity" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Unit</Label>
                    <Input 
                        disabled={inputDisabled}
                        value={item.unit} 
                        onChange={ e => setItem({ ...item, unit: e.target.value })} 
                        type="text" 
                        placeholder="Unit (e.g. kg, gram, tablet, piece)" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Price</Label>
                    <Input 
                        disabled={inputDisabled}
                        required 
                        value={item.price} 
                        onChange={ e => setItem({ ...item, price: parseFloat(e.target.value) })} 
                        type="number"
                        min={0.0} 
                        placeholder="Price" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Type</Label>
                    <div>
                        <Select
                            isDisabled={inputDisabled}
                            className="react-select"
                            classNamePrefix="select"
                            value={ { value: item.type, label: capitalize(item.type) } }
                            onChange={ e => setItem({ ...item, type: e?.value? e.value:'' }) }
                            defaultValue={itemTypes[0]}
                            options={itemTypes}
                            styles={styles}
                            />
                    </div>
                </div>
            </div>
        <div className="flex justify-center mt-4 gap-3">
            <Button type="button" onClick={() => onClose()} variant="outline">
                Cancel
            </Button>
            <Button 
                type="button" 
                className={isPending ? "pointer-events-none" : ""}
                onClick={() => startTransition(() => handleConfirm(item))}
                >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPending ? "Loading.." : "Continue"}
            </Button>
        </div>
    </MaterialModal>
  );
};

export default AddItem;