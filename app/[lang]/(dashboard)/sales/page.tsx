"use client";

import Card from "@/components/ui/card-snippet";
import CustomersToBillTable from "./customers-to-bill-table";
import { translate } from "@/lib/utils";
import { useLanguageContext } from "@/provider/language.provider";
import ScrollButton from "@/components/scroll-button";

const SalesPage = () => {

  const {trans} = useLanguageContext();

  return (
    <>
      <div className="space-y-6">
        <Card title={translate("customers to bill", trans)}>
          <CustomersToBillTable />
        </Card>
      </div>
      <ScrollButton />
    </>
  );
};

export default SalesPage;
