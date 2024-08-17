import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Item from "@/modules/items/domain/item";
import { useSalesContext } from "@/provider/sales.provider";
import { SalesItem } from "@/modules/sales/domain/sales-item";
import { Label } from "@/components/ui/label";

const ItemTable = () => {

    const [items, setItems] = useState<SalesItem[]>([]);

    const {salesItems, setSalesItems, recalculateTotal} = useSalesContext();

    useEffect(() => {
        setItems(salesItems);
        recalculateTotal();
    }, [salesItems, ...salesItems.map(item => item.quantity)])

    const handleQtyChange = (i:number, quantity:number) => {
        let newSalesItems = [...salesItems];
        let newItem = {...salesItems[i]};
        newItem.quantity = quantity;
        newItem.total = quantity * newItem.unit_cost;
        newSalesItems[i] = newItem;
        setSalesItems(newSalesItems);
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-default-600 uppercase"></TableHead>
                    <TableHead className="text-default-600 uppercase">Item</TableHead>
                    <TableHead className="text-default-600 uppercase">Unit Cost</TableHead>
                    <TableHead className="text-default-600 uppercase">Quantity</TableHead>
                    <TableHead className="text-default-600 uppercase">Total</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="[&_tr:last-child]:border-1">
                { items?.map( (item,key) => {
                    return (
                        <TableRow key={key}>
                            <TableCell>
                                <div className="flex items-center gap-2 ">
                                    <Trash2 className="w-4 h-4 text-warning" />
                                </div>
                            </TableCell>
                            <TableCell className="min-w-[220px] w-full max-w-[432px]">
                                <Input
                                    value={item.item.name}
                                    type="text"
                                    placeholder="Gaming Mouse & Keyboard Combo"
                                    className="text-default-800 rounded "
                                />
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-2 items-center">
                                    <Label>Rp</Label>
                                    <Input type="text" value={item.unit_cost} className="text-end font-medium  text-default-900 rounded min-w-[140px]" disabled />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="max-w-[130px] flex">
                                    <Input
                                        className="w-[70px] appearance-none accent-transparent rounded ltr:rounded-r-none ltr:border-r-0 rtl:rounded-l-none rtl:border-l-0"
                                        min={1}
                                        type="number"
                                        defaultValue={item.quantity}
                                        onChange={ e => handleQtyChange(key, e.target.valueAsNumber)}
                                        />
                                    <Select>
                                        <SelectTrigger className="rounded ltr:rounded-l-none rtl:rounded-r-none h-9 pr-1 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:mt-1 ">
                                            <SelectValue defaultValue={item.item.unit} />
                                        </SelectTrigger>
                                        <SelectContent >
                                            <SelectItem value={item.item.unit}>{item.item.unit}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-2 items-center">
                                    <Label>Rp</Label>
                                    <Input type="text" value={item.total} className="text-end font-medium  text-default-900 rounded min-w-[140px]" disabled />
                                </div>
                            </TableCell>
                        </TableRow>
                    )
                }) }
                
            </TableBody>
        </Table>
)

}

export default ItemTable;