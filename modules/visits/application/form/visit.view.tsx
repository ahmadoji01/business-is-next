'use client';

import { Visit } from "../../domain/visit";
import { statusDisplay } from "../../domain/visit.specifications";
import { useTranslations } from "next-intl";

interface VisitViewProps {
    visit: Visit,
}

const VisitView = ({ visit }:VisitViewProps) => {

    const t = useTranslations();

    return (
        <>
            <div className="grid gap-9">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                {t("patients_information")}
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5 text-black dark:text-white">
                            <div>
                                <label className="mb-3 block">
                                    {t("patients_name")}
                                </label>
                                <div className="relative font-bold">
                                    { visit.patient?.name }
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block">
                                    {t("doctor_visited")}
                                </label>
                                <div className="relative font-bold">
                                    { visit.doctor?.name }
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block">
                                    {t("visit_status")}
                                </label>
                                <div className="relative font-bold">
                                    { statusDisplay(visit.status) }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VisitView;