"use client";

import Card from "@/components/ui/card-snippet";
import { translate } from "@/lib/utils";
import { useLanguageContext } from "@/provider/language.provider";
import ScrollButton from "@/components/scroll-button";
import AssetsTable from "./components/assets-table";

const SalesPage = () => {

  const {trans} = useLanguageContext();

  return (
    <>
      <div className="space-y-6">
        <Card title={translate("assets list", trans)}>
          <AssetsTable />
        </Card>
      </div>
      <ScrollButton />
    </>
  );
};

export default SalesPage;
