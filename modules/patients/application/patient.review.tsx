'use client';

import { Patient } from "../domain/patient";
import moment from "moment";
import { useTranslations } from "next-intl";

interface PatientReviewProps {
    patient: Patient,
}

const PatientReview = ({ patient }:PatientReviewProps) => {

    const t = useTranslations();

    return (
        <>
            <div className="grid gap-9">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                { t('personal_information') }
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    { t('full_name') }
                                </label>
                                <div className="relative font-bold">
                                    { patient.name }
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block">
                                    { t('birthday') }
                                </label>
                                <div className="relative font-bold">
                                    { moment(patient.birthday).format("l") }
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block">
                                    { t('gender') }
                                </label>
                                <div className="relative font-bold">
                                    { t(patient.gender) }
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block">
                                    { t('marrital_status') }
                                </label>
                                <div className="relative font-bold">
                                    { t(patient.marrital_status) }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium">
                                { t('family_information') }
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5 text-black dark:text-white">
                            <div>
                                <label className="mb-3 block">
                                    { t('family_id') }
                                </label>
                                <div className="relative font-bold">
                                    { patient.family_id_number }
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block">
                                    { t('fathers_name') }
                                </label>
                                <div className="relative font-bold">
                                    { patient.fathers_name }
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block">
                                    { t('mothers_name') }
                                </label>
                                <div className="relative font-bold">
                                    { patient.mothers_name }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium">
                                { t('professional_information') }
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5 text-black dark:text-white">
                            <div>
                                <label className="mb-3 block">
                                    { t('occupation') }
                                </label>
                                <div className="relative font-bold">
                                    { patient.job }
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block">
                                    { t('education') }
                                </label>
                                <div className="relative font-bold">
                                    { patient.education === 'uneducated' ? t('uneducated') : patient.education }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium">
                                { t('resident_information') }
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5 text-black dark:text-white">
                            <div>
                                <label className="mb-3 block">
                                    { t('resident_number') }
                                </label>
                                <div className="relative font-bold">
                                    { patient.id_card_number }
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block">
                                    { t('address') }
                                </label>
                                <div className="relative font-bold">
                                    { patient.address }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PatientReview;