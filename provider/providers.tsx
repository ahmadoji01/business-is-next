"use client";
import { Inter } from "next/font/google";
import { useThemeStore } from "@/store";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";
import { Toaster as ReactToaster } from "@/components/ui/toaster";
import { Toaster } from "react-hot-toast";
import { SonnToaster } from "@/components/ui/sonner";
import { UserProvider } from "./user.provider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });
const Providers = ({ children }: { children: React.ReactNode }) => {
  const { theme, radius } = useThemeStore();

  return (
    <UserProvider>
      
      <body
        className={cn("dash-tail-app ", inter.className, "theme-" + theme)}
        style={{
          "--radius": `${radius}rem`,
        } as React.CSSProperties
        }
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider
            attribute="class"
            enableSystem={false}
            defaultTheme="light"
          >
            <div className={cn("h-full  ")}>
              <NextTopLoader />
              {children}
              <ReactToaster />
            </div>
            <Toaster />
            <SonnToaster />
          </ThemeProvider>
        </LocalizationProvider>
      </body>
    </UserProvider>
  );
};

export default Providers;
