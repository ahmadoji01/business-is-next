'use client';

import SelectOption from "@/interfaces/select-option";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import WindowedSelect, { createFilter } from "react-windowed-select";
import { MedicalRecordItem, MedicineDoses, defaultMedicineDoses } from "@/modules/medical-records/domain/medical-record";
import MedicationList from "./medication.list";
import { Item } from "@/modules/items/domain/item";
import { defaultCategory } from "@/modules/categories/domain/category";
import { ITEM_TYPE } from "@/modules/items/domain/item.constants";
import { useTranslations } from "next-intl";

interface MedicationFormProps {
    medicines: Item[],
    mrMedicines: MedicalRecordItem[],
    medLoading?: boolean,
    setMRMedicines: Dispatch<SetStateAction<MedicalRecordItem[]>>,
    handleMedChange: (query:string) => void,
}

const MedicationForm = ({ medicines, mrMedicines, medLoading, setMRMedicines, handleMedChange }:MedicationFormProps) => {

    const [medOptions, setMedOptions] = useState<SelectOption[]>([]);
    const [loading, setLoading] = useState(false);
    const t = useTranslations();

    useEffect(() => {
        setLoading(medLoading);
    }, [medLoading])

    useEffect(() => {
        let options:SelectOption[] = [];
        medicines?.map( (medicine) => {
            let name = medicine.name;
            
            if (medicine.stock === 0) {
                name = name + " (" + t("out_of_stock") + ")"
            }
            
            options.push({ value: medicine.id.toString(), label: name, value2: medicine.unit }); 
        });
        setMedOptions(options);
    }, [medicines]);

    const handleChange = (choices: SelectOption[]) => {
        let items:MedicalRecordItem[] = [];
        choices?.map( (choice) => {
            let doses = "";
            let quantity = 1;
            if (mrMedicines.length > 0) {
                let index = mrMedicines.findIndex( mr => mr.items_id.id === choice.value );
                if (index !== -1) {
                    doses = mrMedicines[index].notes;
                    quantity = mrMedicines[index].quantity;
                }    
            }
            items.push({ items_id: { id: choice.value, sku: '', name: choice.label, stock: 0, category: defaultCategory, price: 0, unit: choice.value2, type: ITEM_TYPE.medicine }, type: ITEM_TYPE.medicine, notes: doses, quantity: quantity }); 
        });
        setMRMedicines([...items]);
    }

    return (
        <>
            <div className="grid gap-9">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                { t('medication') }
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <div className="relative bg-white dark:bg-form-input" style={{zIndex: 99999999, borderWidth: 0}}>
                                    <WindowedSelect
                                        defaultValue={mrMedicines}
                                        isMulti
                                        name="medications"
                                        filterOption={createFilter({ ignoreAccents: false })}
                                        windowThreshold={5}
                                        isSearchable={true}
                                        options={medOptions}
                                        isLoading={loading}
                                        onInputChange={e => handleMedChange(e)}
                                        onChange={choices => handleChange(choices)}
                                        className="text-black dark:text-white custom-input-date custom-input-date-2 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        classNamePrefix="select" />
                                </div>
                            </div>
                            <MedicationList mrMedicines={mrMedicines} setMRMedicines={setMRMedicines} />  
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MedicationForm;