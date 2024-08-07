'use client';

import AnimatedContainer from "@/components/animated-container";
import { SalesProvider } from "@/provider/sales.provider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  
  return (
    <SalesProvider>
      <AnimatedContainer>
        <main>{children}</main>
      </AnimatedContainer>
    </SalesProvider>
  )
};

export default Layout;