"use client";

import { Card } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import premium from "@/public/icons/items/premium.png";
import Image from "next/image";
import { imageHandler } from "@/utils/request-handler";
import Item, { Photo } from "@/modules/items/domain/item";
import { currency } from "@/utils/generic-functions";
import { useState } from "react";

interface ItemCardProps {
  isSelected?:boolean, 
  item:Item,
  handleAddItem: (item:Item, quantity:number) => void,
}

const ItemCard = ({ isSelected, item, handleAddItem }:ItemCardProps) => {
    const [count, setCount] = useState<number>(1);

    const handleCount = (value:number) => {
      if (value <= 0)
        return;
    
      setCount(value);
    }

    return (
        <Card className="p-4 rounded-md">
          <Link href="#">
            <div className=" relative h-[191px] flex flex-col justify-center items-center mb-3 rounded-md">
              <div className="w-full overflow-hidden rounded-md relative z-10 bg-default-100 dark:bg-default-200 h-full group">
                <Image
                  alt=""
                  className="  h-full w-full  object-contain p-6  transition-all duration-300 group-hover:scale-105"
                  src={item.photo? imageHandler(item.photo.id, item.photo.filename_download):premium}
                />
              </div>
            </div>
          </Link>

          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs	text-secondary-foreground uppercase font-normal">
                {item.category?.name}
              </p>
            </div>
            <h6 className="text-secondary-foreground text-base	font-medium	mb-[6px] truncate	">
              <Link href="#">{item.name}</Link>
            </h6>
            <p className="mb-4 space-x-4 rtl:space-x-reverse">
              <span className="text-secondary-foreground text-base	font-medium mt-2">
                { currency(item.price) }
              </span>
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 space-x-4 rtl:space-x-reverse items-center ">
                <div className="flex-1 h-10 flex border border-1 border-primary delay-150 ease-in-out  ltr:divide-x-[1px] rtl:divide-x-reverse text-sm font-normal divide-primary rounded">
                  <button
                    type="button"
                    className="flex-none px-4 text-primary hover:bg-primary hover:text-primary-300  disabled:cursor-not-allowed disabled:opacity-50 "
                    onClick={() => handleCount(count-1)}
                  >
                    <Icon icon="eva:minus-fill" />
                  </button>

                  <div className="flex-1 text-base py-2 flex items-center min-w-[45px] justify-center text-primary font-medium">
                    {count}
                  </div>
                  <button
                    type="button"
                    className="flex-none px-4 text-primary hover:bg-primary hover:text-primary-300 disabled:cursor-not-allowed disabled:opacity-50 "
                    onClick={() => setCount(count+1)}
                  >
                    <Icon icon="eva:plus-fill" />
                  </button>
                </div>
              </div>
              <Button className="w-full" onClick={() => handleAddItem(item, count)} disabled={isSelected? true:false}>
                {isSelected? "Item Selected":"Add to Billing"}
              </Button>
            </div>
          </div>
        </Card>
    )
}

export default ItemCard;