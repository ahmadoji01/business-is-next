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
import { Customer } from "@/modules/customers/domain/customer";
import { imageHandler, pagesCount, totalCount } from "@/utils/request-handler";
import { translate } from "@/lib/utils";
import { useLanguageContext } from "@/provider/language.provider";
import { Pagination } from "@mui/material";
import { useUserContext } from "@/provider/user.provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";
import { LIMIT_PER_PAGE } from "@/constants/request";
import { Input } from "@/components/ui/input";
import { DataFilter } from "./filter";
import { X } from "lucide-react";
import { currency, isEmptyObject } from "@/utils/generic-functions";
import { useRouter } from "next/navigation";
import { useSalesContext } from "@/provider/sales.provider";
import { ASSET_STATUS, assetStatuses } from "@/modules/assets/domain/assets.constants";
import { getTotalSearchAssetsWithFilter, searchAssetsWithFilter } from "@/modules/assets/domain/assets.actions";
import { Asset, mapAssets } from "@/modules/assets/domain/assets";
import moment from "moment";
import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";
import ActionDialog from "./action-dialog";

let activeTimeout:any = null;

const AssetsTable = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const assetField = ['id', 'name', 'quantity', 'total', 'unit', 'unit_cost', 'type', 'status', 'lifetime', 'item.name', 'item.id', 'item.price', 'item.type', 'item.unit']
  const {trans} = useLanguageContext();
  const {accessToken} = useUserContext();
  const {filter, setFilter, selectedCustomers, setSelectedCustomers} = useSalesContext();
  const router = useRouter();
  
  useEffect(() => {
      if (accessToken === "")
        return;

      fetchAssets("", {}, 1);
      fetchTotal("", {});
  }, [accessToken]);

  const fetchAssets = async (query:string, filter:object, page:number) => {
    try {
      let res = await searchAssetsWithFilter(accessToken, query, filter, page, assetField);
      let assts = mapAssets(res);
      setAssets(assts);
    } catch(e) {
      toast.error(translate("something_wrong", trans));
    }
  }

  const fetchTotal = async (query:string, filter:object) => {
    try {
      let res = await getTotalSearchAssetsWithFilter(accessToken, query, filter);
      let pages = pagesCount(res[0].count, LIMIT_PER_PAGE);
      setTotalPages(pages);
      setTotal(totalCount(res[0].count));
    } catch(e) {
      toast.error(translate("something_wrong", trans));
    }
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    fetchAssets(searchQuery, filter, value);
  }

  const handleSelectAll = () => {
    if (selectedRows?.length === assets?.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(assets.map((row) => row.id));
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
    fetchAssets(query, filter, 1);
    fetchTotal(query, filter);
  }

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
    fetchAssets(searchQuery, result, 1);
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
      <ActionDialog 
        title="do you want to throw this asset?"
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onConfirm={billCustomers} 
        defaultToast={false} 
        description="The asset value will be set to 0 and the status will change"
        />
      <div className="flex flex-1 flex-wrap items-center gap-2 capitalize">
        <Input
          onChange={ e => handleChange(e.target.value) }
          placeholder={translate("search for assets...", trans)}
          className="h-8 min-w-[200px] max-w-sm"
          />
        
        <DataFilter
          selected={selectedStatus}
          title="Status"
          options={assetStatuses}
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
                checked={selectedRows.length === assets.length || "indeterminate"}
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
                "Item"
              )}
            </TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total Value</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Lifetime/Expiry</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {assets.map((asset:Asset, key) => (
            <TableRow
              key={key}
              className="hover:bg-muted"
              data-state={selectedRows.includes(asset.id) && "selected"}
            >
              <TableCell>
                <Checkbox
                  checked={selectedRows.includes(asset.id)}
                  onCheckedChange={() => handleRowSelect(asset.id)}
                />
              </TableCell>
              <TableCell className="font-medium  text-card-foreground/80">
                <div className="flex gap-3 items-center">
                  <Avatar className=" rounded-full">
                    <AvatarImage src={asset.photo? imageHandler(asset.photo.id, asset.photo.filename_download) : "/images/avatar-256.jpg"} />
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                  <span className=" text-sm   text-card-foreground">
                    {asset.item.name}
                  </span>
                </div>
              </TableCell>
              <TableCell>{asset.quantity} {asset.unit}</TableCell>
              <TableCell>{currency(asset.total)}</TableCell>
              <TableCell>
                <Badge
                  variant="soft"
                  color={
                    (asset.status === ASSET_STATUS.delivered && "success") ||
                    (asset.status === ASSET_STATUS.undelivered && "warning") ||
                    (asset.status === ASSET_STATUS.exist && "info") || "destructive"
                  }
                  className="capitalize"
                >
                  {translate(asset.status, trans)}
                </Badge>
              </TableCell>
              <TableCell>{moment(asset.lifetime).format("DD-MM-YYYY")}</TableCell>
              <TableCell className="pr-5">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="icon"
                      color="secondary"
                      className=" h-7 rounded-full bg-transparent w-7 data-[state=open]:bg-primary data-[state=open]:text-primary-foreground  "
                    >
                      <Icon
                        icon="heroicons:ellipsis-horizontal"
                        className=" h-6 w-6 "
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" avoidCollisions>
                    <DropdownMenuLabel>Action Center</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Icon
                        icon="heroicons:eye"
                        className=" h-4 w-4 mr-2 "
                      />
                      See Asset Detail
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Icon
                        icon="heroicons:banknotes"
                        className=" h-4 w-4 mr-2 "
                      />
                      Asset Cancelled and Reimbursed
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Icon icon="heroicons:truck" className=" h-4 w-4 mr-2 " />
                      Asset Delivered
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500" onClick={openBillDialog}>
                      <Icon icon="heroicons:archive-box-x-mark" className=" h-4 w-4 mr-2 " />
                      Declare Asset Lost
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500" onClick={openBillDialog}>
                      <Icon icon="heroicons:trash" className=" h-4 w-4 mr-2 " />
                      Throw Asset Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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

export default AssetsTable;
