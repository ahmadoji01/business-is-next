"use client";

import React, { useState } from "react";
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
import { useSalesContext } from "@/provider/sales.provider";
import { Customer } from "@/modules/customers/domain/customer";
import { imageHandler } from "@/utils/request-handler";
import { translate } from "@/lib/utils";
import { useLanguageContext } from "@/provider/language.provider";

const CheckboxWithAction = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const {customers} = useSalesContext();
  const {trans} = useLanguageContext();

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

  return (
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
            {selectedRows.length === customers.length ? (
              <div className=" flex gap-2">
                <Button
                  size="xs"
                  variant="outline"
                  className=" text-xs "
                  color="secondary"
                >
                  Bulk edit
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
            <TableCell className="  font-medium  text-card-foreground/80">
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
  );
};

export default CheckboxWithAction;
