import { SalesProvider } from "@/provider/sales.provider";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  
  return (
    <SalesProvider>
      {children}
    </SalesProvider>
  )
};

export default Layout;