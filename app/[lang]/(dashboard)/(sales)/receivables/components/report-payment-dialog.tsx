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
import { Sales } from "@/modules/sales/domain/sales";
import Link from "next/link";
import { useState } from "react";
import Flatpickr from "react-flatpickr";
const ReportPaymentDialog = ({ open, onClose, onConfirm, sales }
  :
  { open:boolean, onClose:() => void, onConfirm:() => void, sales:Sales[] }
) => {
  const [picker, setPicker] = useState<Date>(new Date());
  const [isFullPayment, setIsFullPayment] = useState<boolean>(false);
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
                    <Label>Amount Paid</Label>
                    <Input min={0} max={sales[0]?.total - sales[0]?.paid} type="number" placeholder="Enter last name" />
                  </div>
                }
                <div className="flex flex-col gap-2">
                  <Label>Payment Date</Label>
                  <Flatpickr
                    className="w-full bg-background border border-default-200 focus:border-primary focus:outline-none h-10 rounded-md px-2 placeholder:text-default-600"
                    placeholder="Payment Date"
                    value={picker}
                    onChange={(dates: Date[]) => {
                      setPicker(dates[0] || null);
                    }}
                    id="default-picker"
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
            <Button type="button">Create Account </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportPaymentDialog;
