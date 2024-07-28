'use client';

import * as React from 'react';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import DarkModeSwitcher from "@/components/Operational/Header/DarkModeSwitcher";
import { PatientProvider } from "@/contexts/patient-context";
import { FrontDeskProvider } from "@/contexts/front-desk-context";

const fontFamily = {
  typography: {
    fontFamily: 'Satoshi, sans-serif',
  },
}

const PatientRegistrationProviders = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = React.useState(createTheme({ palette: { mode: "light" } }, fontFamily));

  React.useEffect(() => {
    
    const onStorageChange = () => {
      const item = localStorage.getItem("color-theme");
      const colorTheme = item ? JSON.parse(item) : "light";
      setTheme(createTheme({ palette: { mode: colorTheme } }));
    }
    window.addEventListener('storage', onStorageChange);
  }, []);

  return (
      <PatientProvider>
        <FrontDeskProvider>
            <div className="dark:bg-boxdark-2 dark:text-bodydark min-h-screen">
              <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <div className="fixed top-[2%] right-[2%]">
                  <DarkModeSwitcher />
                </div>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <main>
                    <div className="relative flex flex-1 flex-col h-dvh p-6">
                      {children}
                    </div>
                  </main>
                </ThemeProvider>
              </div>
            </div>
        </FrontDeskProvider>
      </PatientProvider>
  );
}

export default PatientRegistrationProviders;