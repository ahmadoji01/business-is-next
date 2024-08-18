"use client";

import Card from "@/components/ui/card-snippet";
import { translate } from "@/lib/utils";
import { useLanguageContext } from "@/provider/language.provider";
import ScrollButton from "@/components/scroll-button";
import CustomersTable from "./components/customers-table";

const CustomersPage = () => {

  const {trans} = useLanguageContext();

  return (
    <>
      <div className="space-y-6">
        <Card title={translate("customers list", trans)}>
          <CustomersTable />
        </Card>
      </div>
      <ScrollButton />
    </>
  );
};

export default CustomersPage;