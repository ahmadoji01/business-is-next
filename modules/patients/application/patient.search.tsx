import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";

interface PatientSearchProps {
    handleChange: (name:string) => void,
}

const PatientSearch = ({ handleChange }:PatientSearchProps) => {
    
    const t = useTranslations();

    return (
        <div className="relative mb-4">
            <input
                type="text"
                placeholder={ t("front_desk.search_for_a_patient") }
                onChange={e => handleChange(e.target.value)}
                className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125"
                />
            
            <button className="absolute right-0 top-1/2 -translate-y-1/2">
                <FontAwesomeIcon icon={faSearch} width={20} />
            </button>
        </div>
    );
}

export default PatientSearch;