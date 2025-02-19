"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReportsSnapshot from "./components/reports-snapshot";
import CountryMap from "./components/country-map";
import UserDeviceReport from "./components/user-device-report";
import UserStats from "./components/user-stats-chart";
import ReportsArea from "./components/reports-area";
import DashboardSelect from "@/components/dasboard-select";
import TopPage from "./components/top-page";
import DatePickerWithRange from "@/components/date-picker-with-range";
import MenuCard from "./components/menu-card";
import Image from "next/image";
import Link from "next/link";
import { homeMenuItems } from "@/config/menu";
import { translate } from "@/lib/utils";

interface DashboardPageViewProps {
  trans: {
    [key: string]: string;
  };
}
const DashboardPageView = ({ trans }: DashboardPageViewProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center flex-wrap justify-between gap-4">
        <div className="text-2xl font-medium text-default-800 ">
          {trans.home_welcome}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 2xl:gap-7.5">
        { homeMenuItems[0]?.homeMenus.map( (item, key) => (
          <>
            { item.isHeader && 
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-2xl font-medium text-default-800 capitalize">
                { translate(item.title, trans) }
              </div>
            }

            { (!item.isHeader 
                && typeof(item.url) !== 'undefined' 
                && typeof(item.image) !== 'undefined') &&  
              <Link href={item.url} key={key}>
                <MenuCard title={translate(item.title, trans)}>
                  <Image
                    src={item.image}
                    alt="Logo"
                    width={64}
                    height={64}
                    />
                </MenuCard>
              </Link>
            }
          </>
        ))}
      </div>
      <div className="flex items-center flex-wrap justify-between gap-4">
        <div className="text-2xl font-medium text-default-800 ">
          Analytics {trans?.dashboard}
        </div>
        <DatePickerWithRange />
      </div>
      <div className="grid grid-cols-12  gap-6 ">
        <div className="col-span-12 lg:col-span-12">
          <ReportsSnapshot />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <Card>
            <CardHeader className="border-none pb-0">
              <CardTitle className="pt-2.5 capitalize">{ trans?.recent_transaction_list }</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <TopPage />
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ReportsArea />
        </div>
        <Card>
          <CardHeader className="border-none p-6 pt-5 mb-0">
            <CardTitle className="text-lg font-semibold text-default-900 p-0">
              New vs Returning Visitors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <UserStats />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-none p-6 pt-5 mb-0">
            <CardTitle className="text-lg font-semibold text-default-900 p-0">
              Device Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="dashtail-legend">
              <UserDeviceReport />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-2">
        <Card>
          <CardHeader className="border-none pb-0">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex-1 text-xl font-semibold text-default-900 whitespace-nowrap">
                User By Country
              </div>
              <div className="flex-none">
                <DashboardSelect />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-0">
            <CountryMap />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPageView;
