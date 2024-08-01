import { SalesProvider } from "@/provider/sales.provider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SalesProvider>
      {children}
    </SalesProvider>
  )
};

export default Layout;