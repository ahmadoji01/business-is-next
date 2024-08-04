import "../assets/scss/globals.scss";
import "../assets/scss/theme.scss";
import { Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
import Providers from "@/provider/providers";
import "simplebar-react/dist/simplebar.min.css";
import TanstackProvider from "@/provider/providers.client";
import "flatpickr/dist/themes/light.css";
import { LanguageProvider } from "@/provider/language.provider";
import { getDictionary } from "../dictionaries";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default async function RootLayout({ children, params: { lang } }: { children: React.ReactNode; params: { lang: any } }) {
  
  const trans = await getDictionary(lang);
  
  return (
    <html lang={lang}>
      <TanstackProvider>
        <Providers>
          <LanguageProvider translate={trans}>
            <div dir="ltr">{children}</div>
          </LanguageProvider>
        </Providers>
      </TanstackProvider>
    </html>
  );
}
