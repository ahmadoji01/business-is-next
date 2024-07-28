"use client";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader";

import Header from "@/components/Header";
import { ThemeProvider, createTheme } from "@mui/material";
import { useUserContext } from "@/contexts/user-context";
import { MedicalRecordProvider, useMedicalRecordContext } from "@/contexts/medical-record-context";
import { VisitProvider } from "@/contexts/visit-context";

export default function DoctorProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [fetching, setFetching] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  useEffect(() => {
    setFetching(loading);
  }, [loading]);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
        {fetching ? (
        <Loader />
        ) : (
        <VisitProvider>
          <MedicalRecordProvider>
            <div className="flex h-screen overflow-hidden">
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
              </div>
            </div>
          </MedicalRecordProvider>
        </VisitProvider>
        )}
    </div>
  );
}