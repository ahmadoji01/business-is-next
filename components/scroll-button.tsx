import { ArrowDown } from "lucide-react";
import { Button } from "./ui/button";

const ScrollButton = () => {

    function handleScroll() {
        window.scroll({
          top: document.body.offsetHeight,
          left: 0, 
          behavior: 'smooth',
        });
    }

    return (
        <div className="fixed ltr:right-4 rtl:left-4 bottom-6 z-50">
            <Button size="icon" className=" relative h-14 w-14 rounded-full" onClick={handleScroll}>
                <ArrowDown className="h-7 w-7" />
            </Button>
        </div>
    )

}

export default ScrollButton;