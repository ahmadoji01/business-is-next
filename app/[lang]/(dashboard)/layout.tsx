import DashBoardLayoutProvider from "@/provider/dashboard.layout.provider";
import { getServerSession, NextAuthOptions } from "next-auth";
import { redirect } from "next/navigation";
import { getDictionary } from "@/app/dictionaries";
import { directusAuthOptions } from "@/app/api/auth/[...nextauth]/options";

const layout = async ({ children, params: { lang } }: { children: React.ReactNode; params: { lang: any } }) => {
  const session = await getServerSession(directusAuthOptions as NextAuthOptions);

  if (!session) {
    redirect("/auth/login");
  }

  const trans = await getDictionary(lang);

  return (
    <DashBoardLayoutProvider trans={trans}>{children}</DashBoardLayoutProvider>
  );
};

export default layout;
