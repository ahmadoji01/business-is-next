import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SearchIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchItemsWithFilter } from "@/modules/items/domain/items.actions";
import { useUserContext } from "@/provider/user.provider";
import toast from "react-hot-toast";
import { useLanguageContext } from "@/provider/language.provider";
import { translate } from "@/lib/utils";
import Item, { mapItems } from "@/modules/items/domain/item";
import { Category, defaultCategory, mapCategories } from "@/modules/categories/domain/category";
import { getAllCategories } from "@/modules/categories/domain/categories.actions";
import { CircularProgress } from "@/components/ui/progress";
import ItemCard from "./item-card";
import { categoryNameEquals } from "@/modules/items/domain/item.specifications";
import { useSalesContext } from "@/provider/sales.provider";
import { SalesItem, SalesItemCreator } from "@/modules/sales/domain/sales-item";
import { defaultSales } from "@/modules/sales/domain/sales";

let activeTimeout:any = null;

const AddCustomer = ({ open, setOpen }: { open: boolean; setOpen: any }) => {
    
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<Item[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState({});
    const fields = ['id', 'name', 'category.id', 'category.name', 'price', 'stock', 'type', 'unit', 'photo.id', 'photo.filename_download']

    const {accessToken, organization} = useUserContext();
    const {trans} = useLanguageContext();
    const {salesItems, setSalesItems} = useSalesContext();

    const fetchCategories = async () => {
        setLoading(true);
        try {
            let res = await getAllCategories(accessToken, 1);
            let cats = mapCategories(res);
            setCategories(cats);
            setLoading(false);
        } catch {
            toast.error(translate("something_wrong", trans));
            setLoading(false);
        }
    }

    const fetchItems = async (query:string, filter:object) => {
        setLoading(true);
        try {
            let res = await searchItemsWithFilter(accessToken, query, filter, 1, fields);
            let its = mapItems(res);
            setItems(its);
            setLoading(false);
        } catch {
            toast.error(translate("something_wrong", trans));
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategories();
        fetchItems("", {});
    }, [])

    const handleChange = (query:string) => {
        if (activeTimeout) {
          clearTimeout(activeTimeout);
        }
        
        activeTimeout = setTimeout(() => {
          handleSearch(query);
        }, 1000);
    }
    
    const handleSearch = (query:string) => {    
        if (query.length > 1 && query.length <= 3)
          return;
    
        setSearchQuery(query);
        setLoading(true);
        fetchItems(query, filter);
    }

    const handleAddItem = (item:Item, quantity:number) => {
        if (typeof(salesItems.find( itm => itm.item.id === item.id )) !== 'undefined')
            return;

        let newSalesItems = [...salesItems];
        let salesItem:SalesItem = { 
            id: '',
            quantity, 
            total: quantity * item.price,
            item: item,
            type: item.type,
            sales: defaultSales,
            unit_cost: item.price,
        }
        newSalesItems.push(salesItem);
        setSalesItems(newSalesItems);
        toast.success(translate("item_added", trans))
    }

    const categoryClick = (name:string) => {
        if (selectedCategory === name)
            return;

        let newFilter = {};
        if (name !== "")
            newFilter = categoryNameEquals(name);

        setSelectedCategory(name);
        setFilter(newFilter);
        fetchItems(searchQuery, newFilter);
    }
  
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent size="2xl" className="p-0 " hiddenCloseIcon>
                <div className="flex items-center border-b border-default-200">
                    <SearchIcon size={14} className="ml-4" />
                    <Input
                        placeholder=""
                        className="h-14 border-none"
                        onChange={e => handleChange(e.target.value)}
                        />
                    <div className="flex-none flex items-center justify-center gap-1 pr-4">
                    <span className="text-sm text-default-500 font-normal select-none">
                        [esc]
                    </span>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-transparent text-xs hover:text-default-800 px-1"
                        onClick={() => setOpen(false)}
                    >
                        {""}
                        <X className="w-5 h-5 text-default-500" />
                    </Button>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-2">
                    <div className="flex gap-2 overflow-x-auto p-4">
                        <Button color="dark" onClick={() => categoryClick("")} variant={selectedCategory !== ""? "outline" : null}>
                            All Items
                        </Button>
                        { categories?.map( (category, key) => {
                            return (
                                <Button key={key} color="dark" onClick={() => categoryClick(category.name)} variant={selectedCategory !== category.name? "outline" : null}>
                                    {category.name}
                                </Button>
                            )
                        }) }
                    </div>
                </div>
                { loading && 
                    <div className="flex w-full justify-center items-center">
                        <CircularProgress value={50} color="primary" loading />
                    </div>
                }
                <div className="grid max-h-[400px] xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 p-4 overflow-y-auto">
                    { items?.map( (item, key) => {
                        let isSelected = false;
                        if (typeof(salesItems.find( itm => itm.item.id === item.id )) !== 'undefined')
                            isSelected = true;
                        return (
                            <ItemCard
                                isSelected={isSelected} 
                                item={item} 
                                handleAddItem={handleAddItem} />
                        )
                    }) }
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddCustomer;