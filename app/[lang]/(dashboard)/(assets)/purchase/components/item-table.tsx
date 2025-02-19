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
import { Label } from "@/components/ui/label";
import { useAssetsContext } from "@/provider/assets.provider";
import { Asset } from "@/modules/assets/domain/asset";
import moment from "moment";

const ItemTable = () => {
    const [assts, setAssts] = useState<Asset[]>([]);
    const {recalculateTotal, assets, setAssets} = useAssetsContext();

    useEffect(() => {
        setAssts(assets);
        recalculateTotal();
    }, [assets, ...assets.map(asset => asset.quantity)])

    const handleQtyChange = (i:number, quantity:number) => {
        let newAssets = [...assets];
        let newAsset = {...assets[i]};
        newAsset.quantity = quantity;
        newAsset.total = quantity * newAsset.unit_cost;
        newAssets[i] = newAsset;
        setAssets(newAssets);
    }

    const handleRemoveAsset = (i:number) => {
        let newAssets = [...assets];
        newAssets.splice(i,1);
        setAssets(newAssets);
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-default-600 uppercase"></TableHead>
                    <TableHead className="text-default-600 uppercase">Item Name</TableHead>
                    <TableHead className="text-default-600 uppercase">Lifetime/Expiry</TableHead>
                    <TableHead className="text-default-600 uppercase">Unit Cost</TableHead>
                    <TableHead className="text-default-600 uppercase">Quantity</TableHead>
                    <TableHead className="text-default-600 uppercase">Total</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="[&_tr:last-child]:border-1">
                { assts.map( (asset,key) => {
                    return (
                        <TableRow key={key}>
                            <TableCell>
                                <div className="flex items-center gap-2 ">
                                    <Trash2 className="w-4 h-4 text-warning" onClick={ () => handleRemoveAsset(key) } />
                                </div>
                            </TableCell>
                            <TableCell className="min-w-[220px] w-full max-w-[432px]">
                                <Input
                                    value={asset.item?.name}
                                    type="text"
                                    disabled
                                    placeholder="Gaming Mouse & Keyboard Combo"
                                    className="text-default-800 rounded "
                                />
                            </TableCell>
                            <TableCell className="min-w-[220px] w-full max-w-[432px]">
                                <Input
                                    value={moment(asset.lifetime).format("DD-MM-YYYY")}
                                    type="text"
                                    disabled
                                    placeholder="DD/MM/YY"
                                    className="text-default-800 rounded "
                                />
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-2 items-center">
                                    <Label>Rp</Label>
                                    <Input type="text" value={asset.unit_cost} className="text-end font-medium  text-default-900 rounded min-w-[140px]" disabled />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="max-w-[130px] flex">
                                    <Input
                                        className="w-[70px] appearance-none accent-transparent rounded ltr:rounded-r-none ltr:border-r-0 rtl:rounded-l-none rtl:border-l-0"
                                        min={1}
                                        type="number"
                                        defaultValue={asset.quantity}
                                        onChange={ e => handleQtyChange(key, e.target.valueAsNumber)}
                                        />
                                    <Select>
                                        <SelectTrigger className="rounded ltr:rounded-l-none rtl:rounded-r-none h-9 pr-1 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:mt-1 ">
                                            <SelectValue defaultValue={asset.unit} />
                                        </SelectTrigger>
                                        <SelectContent >
                                            <SelectItem value={asset.unit}>{asset.unit}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-2 items-center">
                                    <Label>Rp</Label>
                                    <Input type="text" value={asset.total} className="text-end font-medium  text-default-900 rounded min-w-[140px]" disabled />
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