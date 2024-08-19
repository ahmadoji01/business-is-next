'use client';

import AnimatedContainer from "@/components/animated-container";
import { AssetsProvider } from "@/provider/assets.provider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  
  return (
    <AssetsProvider>
      <AnimatedContainer>
        <main>{children}</main>
      </AnimatedContainer>
    </AssetsProvider>
  )
};

export default Layout;