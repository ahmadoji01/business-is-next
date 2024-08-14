"use client";

import Card from "@/components/ui/card-snippet";
import { translate } from "@/lib/utils";
import { useLanguageContext } from "@/provider/language.provider";
import ScrollButton from "@/components/scroll-button";
import ReceivablesTable from "./components/receivables-table";

const ReceivablesPage = () => {

  const {trans} = useLanguageContext();

  return (
    <>
      <div className="space-y-6">
        <Card title={translate("receivables list", trans)}>
          <ReceivablesTable />
        </Card>
      </div>
      <ScrollButton />
    </>
  );
};

export default ReceivablesPage;