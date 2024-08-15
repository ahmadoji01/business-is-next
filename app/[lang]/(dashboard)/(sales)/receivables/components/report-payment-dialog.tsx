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
const ReportPaymentDialog = ({ open, onClose, onConfirm }
  :
  { open:boolean, onClose:() => void, onConfirm:() => Promise<void> }
) => {
  const [isPending, startTransition] = useTransition();
  const [picker, setPicker] = useState<Date>(new Date());
  const [isFullPayment, setIsFullPayment] = useState<boolean>(false);
  const [sls, setSls] = useState<Sales[]>([]);
  const {trans} = useLanguageContext();
  const {selectedSales} = useSalesContext();

  const handleConfirm = async () => {
    await onConfirm();
    onClose();
    toast.success(translate("Report successfully submitted!", trans));
  }

  return (
    <Dialog open={open}>
      <DialogTrigger asChild />
      <DialogContent size="2xl">
        <DialogHeader className="p-0">
          <DialogTitle className="text-base font-medium text-default-700 ">
            Sales Payment
          </DialogTitle>
        </DialogHeader>
        <div>
          <div className="h-[290px]">
            <ScrollArea className="h-full">
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
                    <Input required min={0} max={selectedSales[0]?.total - selectedSales[0]?.paid} type="number" placeholder="Amount to pay" />
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
          </div>

          <div className=" flex justify-center gap-3 mt-4">
            <DialogClose onClick={onClose} asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button 
              type="button" 
              className={isPending ? "pointer-events-none" : ""}
              onClick={() => startTransition(handleConfirm)}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isPending ? "Loading.." : "Continue"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportPaymentDialog;
