'use client';

import { Doctor } from "@/modules/doctors/domain/doctor";
import { Visit, defaultVisit } from "../domain/visit";
import { useEffect, useState } from "react";
import { DoctorName } from "@/utils/doctor-name-format";
import { useTranslations } from "next-intl";

interface VisitReviewProps {
    doctor: Doctor,
    visit: Visit,
}

const VisitReview = ({ doctor, visit }:VisitReviewProps) => {

    const t = useTranslations();

    const [vis, setVis] = useState(defaultVisit)
    useEffect( () => {
        setVis(visit);
    }, [visit]);

    return (
        <>
            <div className="grid gap-9">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium">
                                { t('visit_information') }
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5 text-black dark:text-white">
                            <div>
                                <label className="mb-3 block">
                                    { t('doctor_to_visit') }
                                </label>
                                <div className="relative font-bold">
                                    { DoctorName(doctor.name, doctor.specialization) }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VisitReview;