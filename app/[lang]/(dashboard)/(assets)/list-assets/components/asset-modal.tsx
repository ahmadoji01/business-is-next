import MaterialModal from "@/components/material-modal";
import { Button } from "@/components/ui/button";
import { CleaveInput } from "@/components/ui/cleave";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Select from "react-select";
import { translate } from "@/lib/utils";
import { Asset } from "@/modules/assets/domain/assets";
import { itemTypes } from "@/modules/items/domain/item.constants";
import { useLanguageContext } from "@/provider/language.provider";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";

const styles = {
    option: (provided: any, state: any) => ({
      ...provided,
      fontSize: "14px",
    }),
};

const AssetModal = ({ open, onClose, onConfirm, title, description, showDetail, assets }
    :
    { open:boolean, onClose:() => void, onConfirm:() => void, title:string, description?:string, showDetail:boolean, assets:Asset[] }
) => {

    const [isPending, startTransition] = useTransition();
    const {trans} = useLanguageContext();

    const handleClose = () => {
        onClose();
    }

    const handleConfirm = () => {
        onConfirm();
        handleClose();
    }

    return (
        <MaterialModal
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
            >
            <h2 id="child-modal-title" className="mb-4 text-xl font-bold">{translate(title, trans)}</h2>
            <div className="flex flex-col gap-2">
                {description}
            </div>
            { (showDetail && assets.length === 1) &&  
                <div className="grid-cols-1 gap-5 space-y-4 overflow-y-auto">
                    <div className="flex flex-col gap-2">
                        <Label>Name</Label>
                        <Input  
                            required
                            disabled
                            value={assets[0].name} 
                            type="text" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Code</Label>
                        <Input  
                            required
                            disabled
                            value={assets[0].code} 
                            type="text" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Quantity</Label>
                        <Input  
                            required
                            value={assets[0].quantity} 
                            disabled
                            type="number"
                            placeholder="Quantity" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Unit</Label>
                        <Input 
                            disabled
                            value={assets[0].unit} 
                            type="text" 
                            placeholder="Unit (e.g. kg, gram, tablet, piece)" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Unit Cost</Label>
                        <CleaveInput
                            id="nu"
                            disabled
                            options={{ numeral: true }}
                            value={assets[0].unit_cost}
                            placeholder="10,000"
                            />
                    </div>
                    <div className="flex flex-col gap-2 mt-4 overflow-y-visible">
                        <Label>Type</Label>
                        <div>
                        <Select
                            required
                            isDisabled={true}
                            className="react-select"
                            classNamePrefix="select"
                            value={ { value: assets[0].type, label: itemTypes.find(itm => assets[0].type === itm.value)?.label, code: "" } }
                            options={itemTypes}
                            styles={styles}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                        <Label>Lifetime/Expiry</Label>
                        <Input 
                            disabled
                            value={moment(assets[0].lifetime).format("DD-MM-YYYY")}
                            type="text" 
                            placeholder="Lifetime/Expiry Date" />
                    </div>
                </div>
            }
            <div className="flex justify-center mt-4 gap-3">
                <Button type="button" onClick={() => handleClose()} variant="outline">
                    Cancel
                </Button>
                
                { !showDetail && 
                    <Button 
                        onClick={handleConfirm}
                        className={isPending ? "pointer-events-none" : ""}
                        >
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isPending ? "Loading.." : "Yes"}
                    </Button>
                }
            </div>
        </MaterialModal>
    )

}

export default AssetModal;