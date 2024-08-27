"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Customer, mapCustomers } from "@/modules/customers/domain/customer";
import { imageHandler, pagesCount, totalCount } from "@/utils/request-handler";
import { translate } from "@/lib/utils";
import { useLanguageContext } from "@/provider/language.provider";
import BillDialog from "./report-payment-dialog";
import { Pagination } from "@mui/material";
import { useUserContext } from "@/provider/user.provider";
import toast from "react-hot-toast";
import { LIMIT_PER_PAGE } from "@/constants/request";
import { DataFilter } from "./filter";
import { X } from "lucide-react";
import { dateFormatOpts, isEmptyObject } from "@/utils/generic-functions";
import { useRouter } from "next/navigation";
import { useSalesContext } from "@/provider/sales.provider";
import { getSalesWithFilter, getTotalSalesWithFilter, updateManySales } from "@/modules/sales/domain/sales.actions";
import { statusFilter } from "@/modules/sales/domain/sales.specifications";
import { SALES_STATUS, salesStatuses } from "@/modules/sales/domain/sales.constants";
import { mapSales, Sales } from "@/modules/sales/domain/sales";
import { Icon } from "@iconify/react";
import ReportPaymentDialog from "./report-payment-dialog";
import PaymentDialog from "./payment-dialog";
import { ENTRIES, EntryAction } from "@/utils/accounting-dictionary";
import { accountsByCodes } from "@/modules/accounts/domain/accounts.specifications";
import { Account, mapAccounts } from "@/modules/accounts/domain/accounts";
import { getAccountsWithFilter } from "@/modules/accounts/domain/accounts.actions";
import { defaultLedgerEntry, LedgerCreator, ledgerCreatorMapper, LedgerEntry } from "@/modules/ledger-entries/domain/ledger-entry";
import { createTransactionMapper, TransactionCreator, transactionMapper } from "@/modules/transactions/domain/transaction";
import { createManyLedgerEntries } from "@/modules/ledger-entries/domain/ledger-entries.actions";
import { createManyTransactions } from "@/modules/transactions/domain/transactions.actions";

let activeTimeout:any = null;

const ReceivablesTable = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [sales, setSales] = useState<Sales[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const {trans} = useLanguageContext();
  const {accessToken, organization} = useUserContext();
  const {filter, setFilter, selectedSales, setSelectedSales} = useSalesContext();
  const router = useRouter();
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'numeric', year: 'numeric' };
  
  useEffect(() => {
      if (accessToken === "")
        return;

      let filter = { _or: [statusFilter(SALES_STATUS.unpaid), statusFilter(SALES_STATUS.partially_paid), statusFilter(SALES_STATUS.installment)] };
      setSelectedStatus([SALES_STATUS.unpaid, SALES_STATUS.partially_paid, SALES_STATUS.installment]);
      setFilter(filter);
      fetchSales(filter, 1);
      fetchTotal(filter);
  }, [accessToken]);

  const fetchSales = async (filter:object, page:number) => {
    try {
      let res = await getSalesWithFilter(accessToken, filter, page);
      let sales = mapSales(res);
      setSales(sales);
    } catch(e) {
      toast.error(translate("something_wrong", trans));
    }
  }

  const fetchTotal = async (filter:object) => {
    try {
      let res = await getTotalSalesWithFilter(accessToken, filter);
      let pages = pagesCount(res[0].count, LIMIT_PER_PAGE);
      setTotalPages(pages);
      setTotal(totalCount(res[0].count));
    } catch(e) {
      toast.error(translate("something_wrong", trans));
    }
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    fetchSales(filter, value);
  }

  const handleSelectAll = () => {
    if (selectedRows?.length === sales?.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(sales.map((row) => row.id));
    }
  };

  const handleRowSelect = (id: string) => {
    const updatedSelectedRows = [...selectedRows];
    if (selectedRows.includes(id)) {
      updatedSelectedRows.splice(selectedRows.indexOf(id), 1);
    } else {
      updatedSelectedRows.push(id);
    }
    setSelectedRows(updatedSelectedRows);
  };

  const billCustomers = async () => {
    router.push('/bill');
  }

  const handleStatusChange = (values:string[]) => {
    setSelectedStatus(values);
    let result = {};
    if (values.length > 0) {
      let statusesFilter:object[] = [];
      values?.map( value => {
        statusesFilter.push({ "status": { _eq: value } });     
      })
      result = { _or: statusesFilter };
    }
    setFilter(result);
    fetchSales(result, 1);
    fetchTotal(result);
    return;
  }

  const openPaymentDialog = () => {
    setModalOpen(true);
    let sls:Sales[] = [];
    selectedRows.map( (row) => {
      let sale = sales.find( sale => sale.id === row );
      if (typeof(sale) !== 'undefined')
        sls.push(sale);
    })
    setSelectedSales(sls);
  }

  const onRowClick = (id:string) => {
    setSelectedRows([id]);
    let sale = sales.find( sale => sale.id === id );
    if (typeof(sale) === 'undefined')
      return;

    setSelectedSales([sale]);
    setModalOpen(true);      
  }

  const onReportPayment = async (fullyPaid:boolean, amount:number) => {
    let field = {};
    let desc = ENTRIES.receivable_payment.description;
    let entries:EntryAction[] = ENTRIES.receivable_payment.actions;
    if (fullyPaid) {
      field = { status: SALES_STATUS.paid };
      amount = selectedSales[0].total;
    }
    else
      field = { status: SALES_STATUS.partially_paid, paid: amount };
    
    let accounts:Account[] = [];
    let entryCodes:string[] = [];
    let entryTypes:string[] = [];
    entries?.map( entry => {
      entryCodes.push(entry.code);
      entryTypes.push(entry.type);
    });
    let filter = accountsByCodes(entryCodes);
    try {
      let res = await getAccountsWithFilter(accessToken, filter);
      accounts = mapAccounts(res);
    } catch {
      toast.error(translate("something_wrong", trans));
      return;
    }

    let ledgerEntries:LedgerEntry[] = [];
    let ledgersToInsert:LedgerCreator[] = [];
    let transactToCreate:TransactionCreator[] = [];

    accounts?.map( account => {
      let ledger:LedgerEntry = {...defaultLedgerEntry};
      let typeIndex = entries.findIndex( action => action.code === account.code);
      ledger.type = entries[typeIndex]?.type?.toLowerCase();
      ledger.account = account;
      ledger.total = amount;
      ledgerEntries.push(ledger);
    });

    selectedRows?.map( row => {
      let transactID = crypto.randomUUID();
      let transactDesc = desc;
      let transact = transactionMapper({
        id: transactID,
        transaction_date: new Date(),
        description: transactDesc,
        document: null,
        total: amount,
      });
      transactToCreate.push(createTransactionMapper(transact, new Date(), organization.id));

      ledgerEntries.map( ent => {
        let createLedger = ledgerCreatorMapper(ent, transactID, organization.id);
        ledgersToInsert.push(createLedger);
      })
    });

    try {
      let res = await updateManySales(accessToken, selectedRows, field);
      res = await createManyTransactions(accessToken, transactToCreate);
      res = await createManyLedgerEntries(accessToken, ledgersToInsert);
      toast.success(translate("Report successfully submitted!", trans));
      window.location.assign("/receivables");
    } catch {
      toast.error(translate("something_wrong", trans));
    }
  }

  return (
    <>
      <PaymentDialog 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onReportPayment={onReportPayment}
        />
      <div className="flex flex-1 flex-wrap items-center gap-2 capitalize">
        
        <DataFilter
          selected={selectedStatus}
          title="Status"
          options={salesStatuses}
          handleStatusChange={handleStatusChange}
          />
        {!isEmptyObject(filter) && (
          <Button
            variant="outline"
            onClick={() => handleStatusChange([])}
            className="h-8 px-2 lg:px-3"
            >
            Reset
            <X className="ltr:ml-2 rtl:mr-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                checked={selectedRows.length === sales.length || "indeterminate"}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>

            <TableHead className=" font-semibold">
              {selectedRows.length > 0 ? (
                <div className=" flex gap-2">
                  <Button
                    onClick={openPaymentDialog}
                    size="xs"
                    variant="outline"
                    className="text-xs"
                    color="secondary"
                  >
                    Report Sales Payment
                  </Button>
                  <Button
                    size="xs"
                    variant="outline"
                    className=" text-xs "
                    color="destructive"
                  >
                    Delete all
                  </Button>
                </div>
              ) : (
                "Name"
              )}
            </TableHead>
            <TableHead>Transaction Date</TableHead>
            <TableHead>Total Billed</TableHead>
            <TableHead>Amount Paid</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {sales.map((sales:Sales) => (
            <TableRow
              key={sales.id}
              className="hover:bg-muted"
              data-state={selectedRows.includes(sales.id) && "selected"}
            >
              <TableCell>
                <Checkbox
                  checked={selectedRows.includes(sales.id)}
                  onCheckedChange={() => handleRowSelect(sales.id)}
                />
              </TableCell>
              <TableCell className="font-medium  text-card-foreground/80">
                <div className="flex gap-3 items-center">
                  <Avatar className=" rounded-full">
                    <AvatarImage src={sales.customer?.photo? imageHandler(sales.customer.photo.id, sales.customer.photo.filename_download) : "/images/avatar-256.jpg"} />
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                  <span className=" text-sm   text-card-foreground">
                    {sales.customer?.name}
                  </span>
                </div>
              </TableCell>

              <TableCell>{Intl.DateTimeFormat('en-US', dateFormatOpts).format(new Date(sales.date_created))}</TableCell>
              <TableCell>{sales.total}</TableCell>
              <TableCell>{sales.paid}</TableCell>
              <TableCell>
                <Badge
                  variant="soft"
                  color={
                    (sales.status === SALES_STATUS.unpaid && "destructive") ||
                    (sales.status === SALES_STATUS.partially_paid && "warning") ||
                    (sales.status === SALES_STATUS.installment && "warning") || "default"
                  }
                  className=" capitalize"
                >
                  {translate(sales.status, trans)}
                </Badge>
              </TableCell>
              <TableCell className="flex gap-3  justify-end">
                <Button
                  size="icon"
                  variant="outline"
                  className=" h-7 w-7"
                  color="secondary"
                  onClick={() => onRowClick(sales.id)}
                  >
                  <Icon icon="heroicons:pencil" className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center flex-wrap gap-4 px-4 py-4">
        <div className="flex-1 text-sm text-muted-foreground whitespace-nowrap">
          ...row(s) selected.
        </div>
        <div className="flex gap-2 items-center">
          <Pagination count={totalPages} onChange={handlePageChange} variant="outlined" color="primary" shape="rounded" />
        </div>
      </div>
    </>
  );
};

export default ReceivablesTable;
