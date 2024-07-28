"use client";

import { useState, useEffect } from "react";
import Loader from "@/components/Loader";

import { ThemeProvider, createTheme } from "@mui/material";
import { useUserContext } from "@/contexts/user-context";
import { VisitProvider } from "@/contexts/visit-context";
import { FrontDeskProvider } from "@/contexts/front-desk-context";

export default function QueueDisplayProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState(createTheme({ palette: { mode: "light" } }));
  const {loading} = useUserContext();

  useEffect(() => {
    const onStorageChange = () => {
      const item = localStorage.getItem("color-theme");
      const colorTheme = item ? JSON.parse(item) : "light";
      setTheme(createTheme({ palette: { mode: colorTheme } }));
    }
    window.addEventListener('storage', onStorageChange);
  }, []);

  return (
      <VisitProvider>
        <FrontDeskProvider>
            <div className="dark:bg-boxdark-2 dark:text-bodydark">
              {loading ? (
                <Loader />
              ) : (
                <div className="flex h-screen overflow-hidden">
                  <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <ThemeProvider theme={theme} >
                      <main>
                        <div className="w-screen h-screen p-4 md:p-6 2xl:p-10">
                          {children}
                        </div>
                      </main>
                    </ThemeProvider>
                  </div>
                </div>
              )}
            </div>
        </FrontDeskProvider>
      </VisitProvider>
  );
}
