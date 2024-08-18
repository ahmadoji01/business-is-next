"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MaterialModal from "@/components/material-modal";
import Select from "react-select";
import { customerStatuses } from "@/modules/customers/domain/customer.constants";
import { Customer, defaultCustomer } from "@/modules/customers/domain/customer";
import { Input } from "@/components/ui/input";

const styles = {
    option: (provided: any, state: any) => ({
      ...provided,
      fontSize: "14px",
    }),
};

const CreateDialog = ({ open, onClose, postACustomer }
  :
  { open:boolean, onClose:() => void, postACustomer:(customer:Customer) => Promise<void> }
) => {
  const [isPending, startTransition] = useTransition();
  const [customer, setCustomer] = useState<Customer>(defaultCustomer);

  const handleConfirm = async () => {
    await postACustomer(customer);
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
            <div className="grid-cols-1 gap-5 space-y-4 overflow-y-scroll">
                <div className="flex flex-col gap-2">
                    <Label>Name</Label>
                    <Input 
                        required 
                        value={customer.name} 
                        onChange={ e => setCustomer({ ...customer, name: e.target.value })} 
                        type="text" 
                        placeholder="Name" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Address</Label>
                    <Input  
                        value={customer.address} 
                        onChange={ e => setCustomer({ ...customer, address: e.target.value })} 
                        type="text" 
                        placeholder="Address" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Email</Label>
                    <Input 
                        value={customer.email} 
                        onChange={ e => setCustomer({ ...customer, email: e.target.value })} 
                        type="text" 
                        placeholder="Email Address" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Phone</Label>
                    <Input 
                        required 
                        value={customer.phone} 
                        onChange={ e => setCustomer({ ...customer, phone: e.target.value })} 
                        type="text" 
                        placeholder="Phone Number" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Status</Label>
                    <div>
                        <Select
                            className="react-select"
                            classNamePrefix="select"
                            onChange={ e => setCustomer({ ...customer, status: e?.value? e.value:'' }) }
                            defaultValue={customerStatuses[0]}
                            options={customerStatuses}
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
                onClick={() => startTransition(handleConfirm)}
                >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPending ? "Loading.." : "Continue"}
            </Button>
        </div>
    </MaterialModal>
  );
};

export default CreateDialog;