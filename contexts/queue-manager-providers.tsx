"use client";

import { useState, useEffect } from "react";
import Loader from "@/components/Loader";

import Header from "@/components/Header";
import { ThemeProvider, createTheme } from "@mui/material";
import { VisitProvider } from "@/contexts/visit-context";
import { FrontDeskProvider, useFrontDeskContext } from "@/contexts/front-desk-context";
import SidebarMenu from "@/app/operational/front-desk/queue-manager/sidebar-menu";
import Footer from "@/app/operational/front-desk/queue-manager/common/footer";
import { DataModalProvider } from "./data-modal-context";
import Sidebar from "@/components/Sidebar";

export default function QueueManagerProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(createTheme({ palette: { mode: "light" } }));
  const {loading} = useFrontDeskContext();

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

  return (
    <VisitProvider>
      <FrontDeskProvider>
        <DataModalProvider>
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
            {loading ? (
              <Loader />
            ) : (
                <div className="flex h-screen overflow-hidden">
                  <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}>
                    <SidebarMenu sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded}  />
                  </Sidebar>
                  <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <Header
                      sidebarOpen={sidebarOpen}
                      setSidebarOpen={setSidebarOpen}
                    />
                    <ThemeProvider theme={theme} >
                      <main>
                        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10" style={ { touchAction: 'none' } }>
                          {children}
                        </div>
                      </main>
                    </ThemeProvider>
                    <Footer />
                  </div>
                </div>
            )}
          </div>
        </DataModalProvider>
      </FrontDeskProvider>
    </VisitProvider>
  );
}