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

const EditDialog = ({ open, onClose, selectedCustomers, patchCustomers }
  :
  { open:boolean, onClose:() => void, selectedCustomers:Customer[], patchCustomers:(customers:Customer[], status:string) => Promise<void> }
) => {
  const [isPending, startTransition] = useTransition();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [aCustomer, setACustomer] = useState<Customer>(defaultCustomer);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    if (selectedCustomers.length === 1)
        setACustomer(selectedCustomers[0]);

    setCustomers(selectedCustomers);
  }, [selectedCustomers]);

  const handleConfirm = async () => {
    let custs = customers;
    if (selectedCustomers.length === 1) {
        custs = [aCustomer];
    }

    await patchCustomers(custs, status);
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
                { customers.length === 1 && 
                    <>
                        <div className="flex flex-col gap-2">
                            <Label>Name</Label>
                            <Input 
                                required 
                                value={aCustomer.name} 
                                onChange={ e => setACustomer({ ...aCustomer, name: e.target.value })} 
                                type="text" 
                                placeholder="Name" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Address</Label>
                            <Input  
                                value={aCustomer.address} 
                                onChange={ e => setACustomer({ ...aCustomer, address: e.target.value })} 
                                type="text" 
                                placeholder="Address" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Email</Label>
                            <Input 
                                value={aCustomer.email} 
                                onChange={ e => setACustomer({ ...aCustomer, email: e.target.value })} 
                                type="text" 
                                placeholder="Email Address" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Phone</Label>
                            <Input 
                                required 
                                value={aCustomer.phone} 
                                onChange={ e => setACustomer({ ...aCustomer, phone: e.target.value })} 
                                type="text" 
                                placeholder="Phone Number" />
                        </div>
                    </>
                }

                <div className="flex flex-col gap-2">
                    <Label>Status</Label>
                    <div>
                        <Select
                            className="react-select"
                            classNamePrefix="select"
                            onChange={ e => setStatus(e?.value? e.value : '') }
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

export default EditDialog;
