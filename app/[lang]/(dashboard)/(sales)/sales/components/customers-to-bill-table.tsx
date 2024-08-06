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
import BillDialog from "./bill-dialog";
import { Pagination } from "@mui/material";
import { useUserContext } from "@/provider/user.provider";
import { getTotalSearchCustomersWithFilter, searchCustomersWithFilter } from "@/modules/customers/domain/customers.actions";
import toast from "react-hot-toast";
import { LIMIT_PER_PAGE } from "@/constants/request";
import { Input } from "@/components/ui/input";
import { DataFilter } from "./filter";
import { customerStatuses } from "@/modules/customers/domain/customer.constants";
import { Router, X } from "lucide-react";
import { isEmptyObject } from "@/utils/generic-functions";
import { useRouter } from "next/navigation";

let activeTimeout:any = null;

const CustomersToBillTable = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({});
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([]);
  const {trans} = useLanguageContext();
  const {accessToken} = useUserContext();
  const router = useRouter();
  
  useEffect(() => {
      if (accessToken === "")
        return;

      fetchCustomers("", {}, 1);
      fetchTotal("", {});
  }, [accessToken]);

  const fetchCustomers = async (query:string, filter:object, page:number) => {
    try {
      let res = await searchCustomersWithFilter(accessToken, query, filter, page);
      let custs = mapCustomers(res);
      setCustomers(custs);
    } catch(e) {
      toast.error(translate("something_wrong", trans));
    }
  }

  const fetchTotal = async (query:string, filter:object) => {
    try {
      let res = await getTotalSearchCustomersWithFilter(accessToken, query, filter);
      let pages = pagesCount(res[0].count, LIMIT_PER_PAGE);
      setTotalPages(pages);
      setTotal(totalCount(res[0].count));
    } catch(e) {
      toast.error(translate("something_wrong", trans));
    }
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    fetchCustomers(searchQuery, filter, value);
  }

  const handleSelectAll = () => {
    if (selectedRows?.length === customers?.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(customers.map((row) => row.id));
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

  const handleChange = (query:string) => {
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

    setSearchQuery(query);
    fetchCustomers(query, filter, 1);
    fetchTotal(query, filter);
  }

  const billCustomers = async () => {
    router.push("/bill");
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
    fetchCustomers(searchQuery, result, 1);
    fetchTotal(searchQuery, result);
    return;
  }

  const openBillDialog = () => {
    setModalOpen(true);
    let custs:Customer[] = [];
    selectedRows.map( (row) => {
      let cust = customers.find( cust => cust.id === row );
      if (typeof(cust) !== 'undefined')
        custs.push(cust);
    })
    setSelectedCustomers(custs);
  }

  return (
    <>
      <BillDialog 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onConfirm={billCustomers} 
        defaultToast={false} 
        customers={selectedCustomers}
        statuses={selectedStatus}
        />
      <div className="flex flex-1 flex-wrap items-center gap-2 capitalize">
        <Input
          onChange={ e => handleChange(e.target.value) }
          placeholder={translate("search for customers...", trans)}
          className="h-8 min-w-[200px] max-w-sm"
          />
        
        <DataFilter
          selected={selectedStatus}
          title="Status"
          options={customerStatuses}
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
                checked={selectedRows.length === customers.length || "indeterminate"}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>

            <TableHead className=" font-semibold">
              {selectedRows.length > 0 || (!isEmptyObject(filter) && total !== 0) ? (
                <div className=" flex gap-2">
                  <Button
                    onClick={openBillDialog}
                    size="xs"
                    variant="outline"
                    className="text-xs"
                    color="secondary"
                  >
                    Bill Customers
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
                "User"
              )}
            </TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {customers.map((customer:Customer) => (
            <TableRow
              key={customer.email}
              className="hover:bg-muted"
              data-state={selectedRows.includes(customer.id) && "selected"}
            >
              <TableCell>
                <Checkbox
                  checked={selectedRows.includes(customer.id)}
                  onCheckedChange={() => handleRowSelect(customer.id)}
                />
              </TableCell>
              <TableCell className="font-medium  text-card-foreground/80">
                <div className="flex gap-3 items-center">
                  <Avatar className=" rounded-full">
                    <AvatarImage src={customer.photo? imageHandler(customer.photo.id, customer.photo.filename_download) : "/images/avatar-256.jpg"} />
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                  <span className=" text-sm   text-card-foreground">
                    {customer.name}
                  </span>
                </div>
              </TableCell>

              <TableCell>{customer.phone}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>
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

export default CustomersToBillTable;
