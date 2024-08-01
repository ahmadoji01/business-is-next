"use client";

import Card from "@/components/ui/card-snippet";
import RowEditingDialog from "./row-editing-dialog";
import CheckboxWithAction from "./checkbox-with-action";
import { Input } from "@/components/ui/input";

const SalesPage = () => {
  return (
    <div className=" space-y-6">
      <Card title="Checkbox and Action">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          <Input
            placeholder="Filter tasks..."
            className="h-8 min-w-[200px] max-w-sm"
          />
        </div>
        <CheckboxWithAction />
      </Card>
      <Card title="Row Editing Dialog">
        <RowEditingDialog />
      </Card>
    </div>
  );
};

export default SalesPage;
