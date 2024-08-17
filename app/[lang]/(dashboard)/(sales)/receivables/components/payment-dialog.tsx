"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { translate } from "@/lib/utils";
import { Sales } from "@/modules/sales/domain/sales";
import { useLanguageContext } from "@/provider/language.provider";
import { useSalesContext } from "@/provider/sales.provider";
import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import toast from "react-hot-toast";
import MaterialModal from "@/components/material-modal";
const PaymentDialog = ({ open, onClose, onReportPayment }
  :
  { open:boolean, onClose:() => void, onReportPayment:(fullyPaid:boolean, amount:number) => Promise<void> }
) => {
  const [isPending, startTransition] = useTransition();
  const [isFullPayment, setIsFullPayment] = useState<boolean>(false);
  const [amountToPay, setAmountToPay] = useState<number>(0);
  const {trans} = useLanguageContext();
  const {selectedSales} = useSalesContext();

  const amountChange = (value:number) => {
    let amount = 0;
    
    if (value > (selectedSales[0]?.total - selectedSales[0]?.paid))
        amount = selectedSales[0]?.total - selectedSales[0]?.paid;
    else if (value < 0)
        amount = 0;
    else
        amount = value;
    setAmountToPay(amount);
    return;
  }

  const handleConfirm = async () => {
    await onReportPayment(isFullPayment, amountToPay);
    onClose();
  }

  return (
    <MaterialModal
        open={open}
        onClose={onClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        >
        <h2 id="child-modal-title" className="mb-4 text-xl font-bold">Sales Payment</h2>
        <ScrollArea>
            <div className="grid-cols-1 gap-5 space-y-4">
                <div className="flex flex-col gap-2">
                    <Label>Amount Unpaid</Label>
                    <Input disabled value={selectedSales[0]?.total - selectedSales[0]?.paid} type="number" placeholder="Amount unpaid" />
                </div>
                <div className="col-span-2 flex  items-center gap-2">
                    <Checkbox id="terms" checked={isFullPayment} onCheckedChange={() => setIsFullPayment(!isFullPayment)} />
                    <Label
                    htmlFor="terms"
                    className="text-xs text-default-700 cursor-pointer"
                    >
                    Full payment
                    </Label>
                </div>
                { !isFullPayment && 
                    <div className="flex flex-col gap-2">
                    <Label>Amount to Pay</Label>
                    <Input 
                        required 
                        min={0} 
                        max={selectedSales[0]?.total - selectedSales[0]?.paid} 
                        value={amountToPay} 
                        onChange={ e => amountChange(parseInt(e.target.value))} type="number" placeholder="Amount to pay" />
                    </div>
                }
                <div className="flex flex-col gap-2">
                    <Label>Payment Date</Label>
                    <DatePicker 
                        className="w-full bg-background border border-default-200 focus:border-primary focus:outline-none h-10 rounded-md px-2 placeholder:text-default-600"
                        views={['year', 'month', 'day']}
                        slotProps={{
                            popper: {
                            sx: {zIndex: 10000}
                            },
                        }}
                        />
                </div>
            </div>
        </ScrollArea>
        <div className="flex justify-center mt-4 gap-3">
            <Button type="button" onClick={() => onClose()} variant="outline">
                Cancel
            </Button>
            <Button 
                type="button" 
                className={isPending ? "pointer-events-none" : ""}
                onClick={() => startTransition(handleConfirm)}
                >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPending ? "Loading.." : "Continue"}
            </Button>
        </div>
    </MaterialModal>
  );
};

export default PaymentDialog;
