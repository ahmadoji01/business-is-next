'use client';

import { useTranslations } from "next-intl";
import { MedicalRecord } from "../domain/medical-record";

interface MedicalRecordFormProps {
    medicalRecord: MedicalRecord,
}

const MedicalRecordView = ({ medicalRecord }:MedicalRecordFormProps) => {

    const t = useTranslations();

    return (
        <>
            <div className="grid gap-9">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                { t('diagnosis') }
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <label className="mb-3 block font-bold text-black dark:text-white">
                                    { t('anamnesis') }
                                </label>
                                <div className="relative bg-white dark:bg-boxdark" style={{zIndex: 99999999, borderWidth: 0}}>
                                    <p className="text-black dark:text-white">{medicalRecord.anamnesis}</p>
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block font-bold text-black dark:text-white">
                                    { t('illnesses') }
                                </label>
                                <div className="relative bg-white dark:bg-boxdark" style={{zIndex: 999999999, borderWidth: 0}}>
                                    <p className="text-black dark:text-white">
                                        <ul>
                                            { medicalRecord.illnesses?.map( (illness, key) => (
                                                <li className="list-outside" style={ { listStyle: "disc" } } key={key}>
                                                    { illness.name }
                                                </li>
                                            )) }
                                        </ul>
                                    </p>
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block font-bold text-black dark:text-white">
                                    { t('medicine_treatment') }
                                </label>
                                <div className="relative z-20 bg-white dark:bg-boxdark" style={{zIndex: 99999999, borderWidth: 0}}>
                                    <p className="text-black dark:text-white">
                                        <ul>
                                            { medicalRecord.items?.map( (item, key) => (
                                                <li className="list-outside" style={ { listStyle: "disc" } } key={key}>
                                                    { item.items_id.name }
                                                </li>
                                            )) }
                                        </ul>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MedicalRecordView;