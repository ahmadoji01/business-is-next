"use client";
import "@/styles/globals.css";
import "@/styles/data-tables-css.css";
import "@/styles/satoshi.css";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader";

import Header from "@/components/Header";
import { ThemeProvider, createTheme } from "@mui/material";
import { useUserContext } from "@/contexts/user-context";
import SidebarMenu from "@/app/dashboard/sidebar-menu";
import { SideMenuItem, sideMenuItems } from "@/config/dashboard/menu";
import Sidebar from "@/components/Sidebar";

export default function DashboardProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sideMenu, setSideMenu] = useState<SideMenuItem>();
  const [fetching, setFetching] = useState(true);
  const [theme, setTheme] = useState(createTheme({ palette: { mode: "light" } }));
  const {user, loading} = useUserContext();

  let storedSidebarExpanded = "true";
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  useEffect(() => {
    const onStorageChange = () => {
      const item = localStorage.getItem("color-theme");
      const colorTheme = item ? JSON.parse(item) : "light";
      setTheme(createTheme({ palette: { mode: colorTheme } }));
    }
    window.addEventListener('storage', onStorageChange);
  }, []);

  useEffect(() => {
    if ( typeof(sidebarExpanded) !== 'undefined' )
      localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  useEffect(() => {
    setFetching(loading);
  }, [loading]);

  useEffect(() => {
    if (user.id === '')
      return;

    let index = sideMenuItems.findIndex( item => item.role === user.role_name );
    setSideMenu(sideMenuItems[index]);
  }, [user])

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {fetching ? (
        <Loader />
      ) : (
        <div className="flex h-screen overflow-hidden">
          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            >
            <SidebarMenu menu={sideMenu} sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded}  />
          </Sidebar>
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
            <ThemeProvider theme={theme} >
              <main>
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                  {children}
                </div>
              </main>
            </ThemeProvider>
          </div>
        </div>
      )}
    </div>
  );
}
