import SalesPageView from "./page-view";
import { getDictionary } from "@/app/dictionaries";

interface SalesPageProps {
  params: {
    lang: any;
  };
}

const SalesPageProps = async ({ params: { lang } }:SalesPageProps) => {

  let trans = await getDictionary(lang);

  return (
    <SalesPageView trans={trans} />
  );
};

export default SalesPageView;
