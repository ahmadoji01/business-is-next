"use client";

import Card from "@/components/ui/card-snippet";
import CustomersToBillTable from "./customers-to-bill-table";
import { Input } from "@/components/ui/input";
import { translate } from "@/lib/utils";
import { SalesProvider } from "@/provider/sales.provider";
import { useLanguageContext } from "@/provider/language.provider";
import ScrollButton from "@/components/scroll-button";

const SalesPageView = () => {

  const {trans} = useLanguageContext();

  return (
    <SalesProvider>
      <div className="space-y-6">
        <Card title={translate("customers to bill", trans)}>
          <div className="flex flex-1 flex-wrap items-center gap-2">
            <Input
              placeholder="Filter tasks..."
              className="h-8 min-w-[200px] max-w-sm"
            />
          </div>
          <CustomersToBillTable />
        </Card>
      </div>
      <ScrollButton />
    </SalesProvider>
  );
};

export default SalesPageView;
