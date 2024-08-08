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
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { useUserContext } from "@/provider/user.provider";
import { useSalesContext } from "@/provider/sales.provider";
import { useEffect, useState } from "react";
import { isEmptyObject } from "@/utils/generic-functions";
import { Customer, mapCustomers } from "@/modules/customers/domain/customer";
import { getAllCustomersWithFilter, getCustomersWithFilter } from "@/modules/customers/domain/customers.actions";
import toast from "react-hot-toast";
import { translate } from "@/lib/utils";
import { useLanguageContext } from "@/provider/language.provider";
import { Badge } from "@/components/ui/badge";
import AddItem from "./components/add-item";
import { useRouter } from "next/navigation";
import ItemTable from "./components/item-table";

const BillPage = () => {

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>("cr_1");
  const custField = ['id', 'name', 'address', 'phone', 'email'];

  const { accessToken, organization } = useUserContext();
  const { selectedCustomers, filter } = useSalesContext();
  const { trans } = useLanguageContext();
  const router = useRouter();

  const fetchCustomers = async () => {
    try {
      let res = await getAllCustomersWithFilter(accessToken, filter, custField);
      let custs = mapCustomers(res);
      setCustomers(custs);
      return;
    } catch {
      toast.error(translate("something_wrong", trans));
    }
  }
  
  const handleValueChange = (value: string) => {
    setSelected(value)
  }

  useEffect(() => {
    if (selectedCustomers.length === 0 && isEmptyObject(filter)) {
      router.push('/sales');
    }

    if (selectedCustomers.length > 0) {
      setCustomers(selectedCustomers);
      return;
    }

    if (isEmptyObject(filter))
      return;

    fetchCustomers();
  }, []);

  return (
    <>
      <AddItem open={open} setOpen={setOpen} />
      <div>
        <Breadcrumbs>
          <BreadcrumbItem>Pages</BreadcrumbItem>
          <BreadcrumbItem>Utility</BreadcrumbItem>
          <BreadcrumbItem>Create Invoice</BreadcrumbItem>
        </Breadcrumbs>
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
                    <div className="text-base font-semibold text-default-800 pb-1">Billing From:</div>
                    <Input type="text" placeholder="Company Name" value={organization?.name} />
                    <Input type="email" placeholder="Company Email" value={organization?.email} />
                    <Textarea placeholder="Company Address" value={organization?.address} />
                  </div>
                  <div className="w-full space-y-2">
                    <div className="text-base font-semibold text-default-800 pb-1">Billing To:</div>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-default-600 uppercase">Name</TableHead>
                            <TableHead className="text-default-600 uppercase">Phone</TableHead>
                            <TableHead className="text-default-600 uppercase">Address</TableHead>
                            <TableHead className="text-default-600 uppercase">Status</TableHead>
                            <TableHead className="text-default-600 uppercase text-end">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody className="[&_tr:last-child]:border-1">
                          {customers.map((customer, key) => {
                            return (
                              <TableRow key={key}>
                                <TableCell>
                                  {customer.name}
                                </TableCell>
                                <TableCell>
                                  {customer.phone}
                                </TableCell>
                                <TableCell>
                                  {customer.address}
                                </TableCell>
                                <TableCell>
                                  <div className="flex gap-2 text-end pr-7">
                                    <Badge
                                      variant="soft"
                                      color={
                                        (customer.status === "blacklisted" && "destructive") ||
                                        (customer.status === "graduated" && "warning") ||
                                        (customer.status === "inactive" && "warning") || "default"
                                      }
                                      className=" capitalize"
                                    >
                                      {translate(customer.status, trans)}
                                    </Badge>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex gap-2">
                                    <Trash2 className="w-4 h-4 text-warning" />
                                  </div>
                                </TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
                <div className="border border-default-300 rounded-md mt-9">
                  <div className="overflow-x-auto">
                    <ItemTable />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 py-5 px-6">
                    <div className="flex-1">
                      <Button onClick={() => setOpen(true)} className="text-xs whitespace-nowrap"> <Plus className="w-5 h-5 ltr:mr-2 rtl:ml-2" /> Add Invoice Item </Button>
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
                        <Input defaultValue="$1243.00" className="text-xs font-medium  text-default-900 rounded w-full sm:w-[148px]" />
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
                      defaultValue="block_1"
                      onValueChange={handleValueChange}
                      >
                      <Label
                        className="flex gap-2.5 items-center w-full rounded-md p-2 hover:bg-default-50 group"
                        htmlFor="block_1"
                        >
                        <div className="h-10 w-10 rounded-full bg-default-100 flex justify-center items-center group-hover:bg-default-200">
                          <Icon icon="codicon:account" className="text-2xl" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-sm font-bold text-default-900 mb-1">Unpaid</h2>
                          <ul className="space-y-[2px]">
                            <li className="text-xs text-default-500">Customer has not paid the bill yet.</li>
                          </ul>
                        </div>
                        <RadioGroupItem
                          value="block_1"
                          id="block_1"
                          color="primary"
                        ></RadioGroupItem>
                      </Label>
                      <Label
                        className="flex gap-2.5 items-center w-full rounded-md p-2 hover:bg-default-50 group"
                        htmlFor="block_2"
                        >
                        <div className="h-10 w-10 rounded-full bg-default-100 flex justify-center items-center group-hover:bg-default-200">
                          <Icon icon="ant-design:message-outlined" className="text-2xl" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-sm font-bold text-default-900 mb-1">Paid</h2>
                          <ul className="space-y-[2px]">
                            <li className="text-xs text-default-500">Customer has paid prior to invoice creation.</li>
                          </ul>
                        </div>
                        <RadioGroupItem
                          value="block_2"
                          id="block_2"
                          color="primary"
                        ></RadioGroupItem>
                      </Label>
                    </RadioGroup>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="text-xl font-bold">Payment Method</div>
                    <Checkbox defaultChecked id="bank" className="border-default-300"> Bank Account</Checkbox>
                    <Checkbox id="paypal" className="border-default-300"> Paypal</Checkbox>
                    <Checkbox id="credit" className="border-default-300"> Credit/Debit Card</Checkbox>
                    <Checkbox id="transfer" className="border-default-300"> UPI Transfer</Checkbox>
                    <Checkbox id="cod" className="border-default-300"> Cash On Delivery (COD)</Checkbox>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="sticky bottom-2 mt-4 flex w-full gap-2">
            <div className="flex-1">
              <Button asChild className="p-8 text-2xl w-full bg-default-200 font-semibold text-default-600 group hover:text-primary-foreground whitespace-nowrap">
                <Link href="/invoice-details"><Icon icon="heroicons:eye" className="w-5 h-5 text-default-500 ltr:mr-2 rtl:ml-2 group-hover:text-primary-foreground" /> Preview</Link>
              </Button>
            </div>
            <div className="flex-1">
              <Button asChild className="p-8 text-2xl w-full group hover:bg-default-200 hover:text-default-900 font-semibold whitespace-nowrap">
                <Link href=""><Icon icon="heroicons:paper-airplane" className="w-5 h-5 ltr:mr-2 rtl:ml-2 group-hover:text-default-900" /> Send Invoice</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BillPage;