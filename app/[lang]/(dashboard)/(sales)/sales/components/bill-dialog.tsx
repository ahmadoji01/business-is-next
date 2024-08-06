import React, { useState, useTransition } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useLanguageContext } from "@/provider/language.provider";
import { translate } from "@/lib/utils";
import { Customer } from "@/modules/customers/domain/customer";

const BillDialog = ({ open, onClose, onConfirm, defaultToast = true, toastMessage = "Successfully deleted",
customers, statuses}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  defaultToast?: boolean;
  toastMessage?: string;
  customers: Customer[];
  statuses: string[];
}) => {
  const [isPending, startTransition] = useTransition();
  const {trans} = useLanguageContext();

  const handleConfirm = async () => {
    await onConfirm();
    onClose();
    if (defaultToast) {
      toast.success(toastMessage, {
        position: "top-right",
      });
    }
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <span className="capitalize">
              {translate("do you want to bill these customers?", trans)}
            </span>
          </AlertDialogTitle>
          <AlertDialogDescription>
              { customers.length > 0 && 
                <ul>
                  { customers.map( (customer, key) => {
                      return (
                        <li key={key}>{customer.name}</li>
                      )
                    })
                  }
                </ul>
              }  
              { statuses.length > 0 && 
                <>
                  <h5>Status:</h5>
                  <ul className="capitalize">
                    { statuses.map( (status, key) => {
                        return (
                          <li key={key}>{translate(status, trans)}</li>
                        )
                      })
                    }
                  </ul>
                </>
              }  
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={isPending ? "pointer-events-none" : ""}
            onClick={() => startTransition(handleConfirm)}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Deleting.." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BillDialog;
