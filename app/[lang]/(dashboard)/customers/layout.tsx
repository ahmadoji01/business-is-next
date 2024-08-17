'use client';

import AnimatedContainer from "@/components/animated-container";

const Layout = ({ children }: { children: React.ReactNode }) => {
  
  return (
    <AnimatedContainer>
      <main>{children}</main>
    </AnimatedContainer>
  )
};

export default Layout;