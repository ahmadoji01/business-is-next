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
import { Category, mapCategories } from "@/modules/categories/domain/category";
import { getAllCategories } from "@/modules/categories/domain/categories.actions";
const AddItem = ({ open, setOpen }: { open: boolean; setOpen: any }) => {
    
    const [items, setItems] = useState<Item[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const fields = ['id', 'name', 'category.id', 'category.name', 'price', 'stock', 'type', 'unit', 'photo.id', 'photo.filename_download']

    const {accessToken} = useUserContext();
    const {trans} = useLanguageContext();

    const fetchCategories = async () => {
        try {
            let res = await getAllCategories(accessToken, 1);
            let cats = mapCategories(res);
            setCategories(cats);
        } catch {
            toast.error(translate("something_wrong", trans));
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    const searchItems = async (query:string) => {
        try {
            let res = searchItemsWithFilter(accessToken, query, {}, 1, fields);
            let its = mapItems(res);
            setItems(its);
        } catch {
            toast.error(translate("something_wrong", trans));
        }
    }
  
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent size="xl" className="p-0 " hiddenCloseIcon>
                <div className="flex items-center border-b border-default-200">
                    <SearchIcon size={14} className="ml-4" />
                    <Input
                        placeholder=""
                        className="h-14 border-none"
                        onChange={e => searchItems(e.target.value)}
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
                    <div className="flex gap-2 overflow-x-auto">
                        <Button color="dark" variant="outline">
                            All Items
                        </Button>
                        { categories?.map( (category, key) => {
                            return (
                                <Button key={key} color="dark" variant="outline">
                                    {category.name}
                                </Button>
                            )
                        }) }
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddItem;