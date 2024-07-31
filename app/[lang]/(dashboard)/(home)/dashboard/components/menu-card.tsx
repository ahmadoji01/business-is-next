import { Card } from "@/components/ui/card";

interface DashboardPageViewProps {
    trans: {
      [key: string]: string;
    };
}
const MenuCard = ({ children=(<></>), title="" }) => {

    return (
        <Card>
            <div className="hover:border-4 hover:border-black dark:hover:border-white flex py-3 items-center justify-center w-full p-4">
                <div className="flex-col mr-2 w-1/4 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                    {children}
                </div>

                <div className="flex-col my-auto w-3/4 items-center justify-center">
                    <div>
                        <h4 className="font-bold text-black dark:text-white">
                            {title}
                        </h4>
                    </div>
                </div>
            </div>
        </Card>
    )

} 

export default MenuCard;