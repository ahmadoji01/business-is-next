"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
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
import Link from "next/link";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { useUserContext } from "@/provider/user.provider";
import { useSalesContext } from "@/provider/sales.provider";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { translate } from "@/lib/utils";
import { useLanguageContext } from "@/provider/language.provider";
import AddItem from "./components/add-item";
import ItemTable from "./components/item-table";
import { defaultSales, SalesCreator, salesCreatorMapper } from "@/modules/sales/domain/sales";
import { ENTRIES, EntryAction } from "@/utils/accounting-dictionary";
import { Account, defaultAccount, mapAccounts } from "@/modules/accounts/domain/account";
import { getAccountsWithFilter } from "@/modules/accounts/domain/accounts.actions";
import { accountsByCodes } from "@/modules/accounts/domain/account.specifications";
import { createTransactionMapper, Transaction, TransactionCreator, transactionMapper } from "@/modules/transactions/domain/transaction";
import { defaultLedgerEntry, LedgerCreator, ledgerCreatorMapper, LedgerEntry } from "@/modules/ledger-entries/domain/ledger-entry";
import { createATransaction, createManyTransactions } from "@/modules/transactions/domain/transactions.actions";
import { createManySales } from "@/modules/sales/domain/sales.actions";
import { createManyLedgerEntries } from "@/modules/ledger-entries/domain/ledger-entries.actions";
import { useAssetsContext } from "@/provider/assets.provider";
import { DatePicker } from "@mui/x-date-pickers";
import { defaultSupplier, mapSuppliers, Supplier, SupplierCreator, supplierCreatorMapper } from "@/modules/supplier/domain/supplier";
import { PURCHASE_STATUS } from "@/modules/purchase/domain/purchases.constants";
import { PurchaseCreator, purchaseCreatorMapper } from "@/modules/purchase/domain/purchase";
import { createAPurchase } from "@/modules/purchase/domain/purchases.actions";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { searchSuppliersWithFilter } from "@/modules/supplier/domain/suppliers.actions";

let activeTimeout:any = null;

const PurchasePage = () => {

  const [open, setOpen] = useState(false);
  const [sales, setSales] = useState(defaultSales);
  const [selected, setSelected] = useState<string>("paid_delivered");
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [supplier, setSupplier] = useState(defaultSupplier);
  const [supplierOpts, setSupplierOpts] = useState<Supplier[]>([]);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [fetchingSupplier, setFetchingSupplier] = useState(false);
  const [supplierQuery, setSupplierQuery] = useState("");
  const [supplierFilter, setSupplierFilter] = useState({});

  const { accessToken, organization } = useUserContext();
  const { assets, purchase, setPurchase } = useAssetsContext();
  const { trans } = useLanguageContext();

  useEffect(() => {}, [purchase]);
  useEffect(() => {}, [assets]);

  const fetchSuppliers = async (query:string, filter:object) => {
    try {
      let res = await searchSuppliersWithFilter(accessToken, query, filter, 1);
      let suppliers = mapSuppliers(res);
      let opts:Supplier[] = [];
      suppliers.map( supplier => opts.push(supplier));
      setSupplierOpts(opts);
      setFetchingSupplier(false);
    } catch {
        toast.error(translate("something_wrong", trans));
        setFetchingSupplier(false);
    }
  }

  const insertPurchase = async (transactToCreate:TransactionCreator, purchaseToCreate:PurchaseCreator, ledgersToCreate:LedgerCreator[]) => {
    try {
      let res = await createATransaction(accessToken, transactToCreate);
      res = await createAPurchase(accessToken, purchaseToCreate);
      res = await createManyLedgerEntries(accessToken, ledgersToCreate);
      toast.success("A purchase has been created!");
      window.location.assign("/purchase");
    } catch(e) {
      console.log(e);
      toast.error(translate("something_wrong", trans));
    }
  }
  
  const handleValueChange = (value: string) => {
    setSelected(value);
    let newPurchase = {...purchase};
    newPurchase.status = value;
    setPurchase(newPurchase);
  }
  
  const handleSubmit = async () => {
    if (assets.length <= 0)
      toast.error(translate("Item is empty. Add an item first before submitting purchase", trans));
    
    let desc = "";
    let entries:EntryAction[] = [];
    purchase.assets = assets;
    if (purchase.status === PURCHASE_STATUS.paid_delivered) {
      entries = ENTRIES.purchase_paid_and_delivered.actions;
      desc = ENTRIES.purchase_paid_and_delivered.description;
      purchase.paid = purchase.total;
    }
    else if (purchase.status === PURCHASE_STATUS.paid_undelivered) {
      entries = ENTRIES.purchase_paid_and_undelivered.actions;
      desc = ENTRIES.purchase_paid_and_undelivered.description;
      purchase.paid = purchase.total;
    } else {
      entries = ENTRIES.purchase_unpaid.actions;
      desc = ENTRIES.purchase_unpaid.description;
      purchase.paid = 0;
    }

    let accounts:Account[] = [];
    let assetsLedger:LedgerEntry[] = [];
    let assetCodes:string[] = [];
    assets?.map( asset => {
      assetCodes.push(asset.code);
    });
    assetCodes.push(entries[1].code);
    let filter = accountsByCodes(assetCodes);
    console.log(filter);
    try {
      let res = await getAccountsWithFilter(accessToken, filter);
      accounts = mapAccounts(res);
    } catch {
      toast.error(translate("something_wrong", trans));
      return;
    }

    assets?.map( asset => {
      let ledger:LedgerEntry = {...defaultLedgerEntry};
      let type = entries[0].type;
      ledger.type = type.toLowerCase();

      let account = accounts.find( account => account.code === asset.code);
      ledger.account = account? account:defaultAccount;
      ledger.total = asset.unit_cost * asset.quantity;
      assetsLedger.push(ledger);

      ledger = {...defaultLedgerEntry};
      ledger.type = entries[1].type;
      account = accounts.find( account => account.code === entries[1].code );
      ledger.account = account? account:defaultAccount;
      ledger.total = asset.unit_cost * asset.quantity;
      assetsLedger.push(ledger);
    })

    let ledgersToInsert:LedgerCreator[] = [];    
    let transactID = crypto.randomUUID();
    let transactDesc = desc;
    let transact = transactionMapper({
      id: transactID,
      transaction_date: transactionDate,
      description: transactDesc,
      document: null,
      total: purchase.total,
    });

    let suppl:SupplierCreator|string = "";
    if (supplier.id === "") {
      suppl = supplierCreatorMapper(supplier, organization.id);
    } else {
      suppl = supplier.id;
    }

    let transactToCreate = createTransactionMapper(transact, transactionDate, organization.id);
    let purchaseToCreate = purchaseCreatorMapper(purchase, organization.id, transactID, suppl);  

    assetsLedger.map( ent => {
      let createLedger = ledgerCreatorMapper(ent, transactID, organization.id);
      createLedger.total = purchase.total;
      ledgersToInsert.push(createLedger);
    })
    
    insertPurchase(transactToCreate, purchaseToCreate, ledgersToInsert);
  }

  const handleSupplierChange = (query:string) => {
    setSupplier(defaultSupplier);
    if (query === "")
        setInputDisabled(false);

    if (activeTimeout) {
        clearTimeout(activeTimeout);
    }
    
    activeTimeout = setTimeout(() => {
        handleSearch(query);
    }, 1000);
  }

  const handleSearch = (query:string) => {   
    if (query.length > 1 && query.length <= 3)
        return;

    setSupplierQuery(query);
    setFetchingSupplier(true);
    fetchSuppliers(query, {});
  }
  
  const handleOptClick = (value:string) => {
    let sup = supplierOpts.find( item => item.name === value);
    
    if (typeof(sup) === 'undefined')
        return;

    setInputDisabled(true);
    setSupplier({ ...supplier, id: sup.id, name: sup.name, address: sup.address, phone: sup.phone, email: sup.email });
  }

  return (
    <>
      <AddItem open={open} onClose={() => setOpen(false)} />
      <div>
        <Breadcrumbs>
          <BreadcrumbItem>Pages</BreadcrumbItem>
          <BreadcrumbItem>Utility</BreadcrumbItem>
          <BreadcrumbItem>Create Invoice</BreadcrumbItem>
        </Breadcrumbs>
        <form onSubmit={ (e) => { e.preventDefault(); handleSubmit() } }>
          <div className="invoice-wrapper mt-6 ">
            <div className="grid grid-cols-12 gap-6">
              <Card className="col-span-12 xl:col-span-8 ">
                <CardHeader className="sm:flex-row sm:items-center gap-3">
                  <div className="flex-1 text-xl font-medium text-default-700 whitespace-nowrap">Create Invoice</div>
                  <div className="flex-none flex items-center gap-4">
                    <Button>Save As PDF <Icon icon="heroicons:document-text" className="w-5 h-5 ltr:ml-2 rtl:mr-2" /></Button>
                    <Button className="border-default-300 group" size="icon" variant="outline" >
                      <Icon icon="heroicons:printer" className="w-5 h-5 text-default-300 group-hover:text-default-50 dark:group-hover:text-primary-foreground" />
                    </Button>
                    <Button className="border-default-300 group" size="icon" variant="outline">
                      <Icon icon="heroicons:arrow-path" className="w-5 h-5 text-default-300 group-hover:text-default-50 dark:group-hover:text-primary-foreground" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mt-8 flex justify-between flex-wrap gap-4">
                    <div className="w-full space-y-2">
                      <div className="text-base font-semibold text-default-800 pb-1">Purchase From:</div>
                      <Autocomplete
                          id="free-solo-demo"
                          freeSolo
                          options={supplierOpts.map( (supplier) => supplier.name)}
                          onInputChange={(event: any, newValue: string | null) => { if (newValue === "") setInputDisabled(false) }}
                          onChange={(event: any, newValue: string | null) => {
                              let val = newValue? newValue : "";
                              handleOptClick(val);
                          }}
                          renderInput={(params) => 
                              <TextField {...params} 
                                  required
                                  onChange={ e => handleSupplierChange(e.target.value)}
                                  InputProps={{
                                      ...params.InputProps,
                                      endAdornment: (
                                          <React.Fragment>
                                              {fetchingSupplier ? <CircularProgress color="inherit" size={20} /> : null}
                                              {params.InputProps.endAdornment}
                                          </React.Fragment>
                                      ),
                                  }}
                                  />}
                          />
                      <Input type="email" 
                        disabled={inputDisabled}
                        onChange={ (e) => setSupplier({ ...supplier, email: e.target.value }) } 
                        placeholder="Company Email" 
                        value={supplier?.email} 
                        />
                      <Input type="phone"
                        disabled={inputDisabled} 
                        onChange={ (e) => setSupplier({ ...supplier, phone: e.target.value }) } 
                        placeholder="Company Phone" 
                        value={supplier?.phone} />
                      <Textarea 
                        disabled={inputDisabled}
                        onChange={ (e) => setSupplier({ ...supplier, phone: e.target.value }) } 
                        placeholder="Company Address" 
                        value={supplier?.address} />
                    </div>
                    <div className="w-full space-y-2">
                      <div className="text-base font-semibold text-default-800 pb-1">Transaction Date:</div>
                      <DatePicker 
                        className="w-full" 
                        onChange={ e => setTransactionDate(e? e.toDate():new Date())}
                        slotProps={{
                          textField: {
                            required: true,
                          },
                        }} 
                        />
                    </div>
                  </div>
                  <div className="border border-default-300 rounded-md mt-9">
                    <div className="overflow-x-auto">
                      <ItemTable />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 py-5 px-6">
                      <div className="flex-1">
                        <Button onClick={(e) => { e.preventDefault(); setOpen(true) }} className="text-xs whitespace-nowrap"> <Plus className="w-5 h-5 ltr:mr-2 rtl:ml-2" /> Add Item </Button>
                      </div>
                      <div className="flex-none flex flex-col sm:items-end gap-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
                          <div className="text-sm font-medium text-default-600">Sub Total:</div>
                          <Input defaultValue="$1663.00" className="text-xs font-medium  text-default-900 rounded w-full sm:w-[148px]" />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
                          <div className="text-sm font-medium text-default-600">Tax:</div>
                          <div className="w-full sm:w-[148px] flex">
                            <Input
                              className=" text-xs font-medium  text-default-900 appearance-none accent-transparent rounded ltr:rounded-r-none rtl:rounded-l-none rtl:border-l-0  ltr:border-r-0"
                              type="number"
                              defaultValue="0.82"
                            />
                            <Select>
                              <SelectTrigger className="w-14 rounded ltr:rounded-l-none rtl:rounded-r-none h-9 pr-1 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:mt-1">
                                <SelectValue placeholder="%" />
                              </SelectTrigger>
                              <SelectContent >
                                <SelectItem value="%">%</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
                          <div className="text-sm font-medium text-default-600">Total:</div>
                          <Label>Rp</Label>
                          <Input type="text" value={purchase.total} className="text-xs font-medium  text-default-900 rounded w-full sm:w-[148px]" disabled />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-6 mt-6">
                    <div>
                      <Label htmlFor="note" className="text-sm font-medium text-default-600 mb-1">Note:</Label>
                      <Textarea id="note" className="rounded h-10"
                        placeholder="type note..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="terms" className="text-sm font-medium text-default-600 mb-1">Terms & Conditions:</Label>
                      <Textarea id="terms" className="rounded h-10" placeholder="type terms..." />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="col-span-12 xl:col-span-4">
                <Card className="sticky top-20">
                  <CardHeader>
                    <CardTitle>Payment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <RadioGroup
                        defaultValue="paid_delivered"
                        onValueChange={handleValueChange}
                        >
                        <Label
                          className="flex gap-2.5 items-center w-full rounded-md p-2 hover:bg-default-50 group"
                          htmlFor="paid_delivered"
                          >
                          <div className="h-10 w-10 rounded-full bg-default-100 flex justify-center items-center group-hover:bg-default-200">
                            <Icon icon="codicon:account" className="text-2xl" />
                          </div>
                          <div className="flex-1">
                            <h2 className="text-sm font-bold text-default-900 mb-1">Paid and Item(s) Delivered</h2>
                            <ul className="space-y-[2px]">
                              <li className="text-xs text-default-500">Item(s) have been paid and delivered.</li>
                            </ul>
                          </div>
                          <RadioGroupItem
                            value="paid_delivered"
                            id="paid_delivered"
                            color="primary"
                          ></RadioGroupItem>
                        </Label>
                        <Label
                          className="flex gap-2.5 items-center w-full rounded-md p-2 hover:bg-default-50 group"
                          htmlFor="paid_undelivered"
                          >
                          <div className="h-10 w-10 rounded-full bg-default-100 flex justify-center items-center group-hover:bg-default-200">
                            <Icon icon="ant-design:message-outlined" className="text-2xl" />
                          </div>
                          <div className="flex-1">
                            <h2 className="text-sm font-bold text-default-900 mb-1">Paid and Item(s) Undelivered</h2>
                            <ul className="space-y-[2px]">
                              <li className="text-xs text-default-500">Item(s) have been paid but undelivered.</li>
                            </ul>
                          </div>
                          <RadioGroupItem
                            value="paid_undelivered"
                            id="paid_undelivered"
                            color="primary"
                          ></RadioGroupItem>
                        </Label>
                        <Label
                          className="flex gap-2.5 items-center w-full rounded-md p-2 hover:bg-default-50 group"
                          htmlFor="unpaid"
                          >
                          <div className="h-10 w-10 rounded-full bg-default-100 flex justify-center items-center group-hover:bg-default-200">
                            <Icon icon="codicon:account" className="text-2xl" />
                          </div>
                          <div className="flex-1">
                            <h2 className="text-sm font-bold text-default-900 mb-1">Unpaid</h2>
                            <ul className="space-y-[2px]">
                              <li className="text-xs text-default-500">The purchase has not been paid yet.</li>
                            </ul>
                          </div>
                          <RadioGroupItem
                            value="unpaid"
                            id="unpaid"
                            color="primary"
                          ></RadioGroupItem>
                        </Label>
                      </RadioGroup>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="sticky bottom-2 mt-4 flex w-full gap-2">
              <div className="flex-1 w-full">
                <Button type="submit" className="p-8 text-2xl w-full group hover:bg-default-200 hover:text-default-900 font-semibold whitespace-nowrap">
                  Submit Purchase
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default PurchasePage;