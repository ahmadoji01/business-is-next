import { Dispatch, SetStateAction } from "react";
import { MedicalRecordItem } from "../../domain/medical-record";
import { useTranslations } from "next-intl";

interface MedicationListProps {
    mrMedicines: MedicalRecordItem[],
    setMRMedicines: Dispatch<SetStateAction<MedicalRecordItem[]>>,
}

const MedicationList = ({ mrMedicines, setMRMedicines }:MedicationListProps) => {

    const t = useTranslations();

    const dosesChange = (doses:string, i:number) => {
        let newDoses = [...mrMedicines];
        newDoses[i].notes = doses;
        setMRMedicines(newDoses);
    }

    const qtyChange = (quantity=0, i=0) => {
        let newDoses = [...mrMedicines];
        newDoses[i].quantity = quantity;
        setMRMedicines(newDoses);
    }

    return (
        <>
            { mrMedicines?.map( (mrMed, i) => 
                <div key={i} className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="text-black font-extrabold dark:text-white text-xl">
                            { mrMed.items_id.name }
                        </h3>
                        <p>{ t('doses') }:</p>
                        <div className="flex flex-row">
                            <div className="flex-auto w-full h-full">
                            <input
                                onChange={ e => dosesChange(e.target.value, i)}
                                required
                                name="doses"
                                placeholder={ t("input_doses_example") }
                                className="text-black dark:text-white w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>
                        </div>
                        <p>{ t('quantity') }:</p>
                        <div className="flex flex-row">
                            <input
                                type="number"
                                onChange={ e => qtyChange(parseInt(e.target.value), i)}
                                required
                                name="quantity"
                                min={1}
                                className="text-black dark:text-white custom-input-date custom-input-date-2 w-1/2 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" 
                                />
                            <p className="text-black dark:text-white w-1/2 my-auto ml-2">{mrMed.items_id.unit}</p>
                        </div>
                    </div>
                </div>
            ) }
        </>
    )
}

export default MedicationList;