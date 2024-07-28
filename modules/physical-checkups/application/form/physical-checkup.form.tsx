import SubmitButton from "@/components/Dashboard/Submit";
import { PhysicalCheckup } from "../../domain/physical-checkup";
import { useEffect, useState } from "react";
import { Patient } from "@/modules/patients/domain/patient";
import { useTranslations } from "next-intl";
import Spinner from "@/components/Spinner";
import MiniSpinner from "@/components/MiniSpinner";

interface PhysicalCheckupFormProps {
    loading: boolean,
    patient: Patient,
    initCheckup: PhysicalCheckup,
    handleSubmit: (checkup:PhysicalCheckup) => void,
}

const PhysicalCheckupForm = ({ loading, patient, initCheckup, handleSubmit }:PhysicalCheckupFormProps) => {
    const [checkup, setCheckup] = useState(initCheckup);
    const [submitting, setSubmitting] = useState(false);
    const t = useTranslations();

    useEffect( () => {
        setCheckup({ ...checkup, patient })
    }, [patient]);

    useEffect( () => {
        setSubmitting(loading);
    }, [loading]);

    return (
        <div className="flex flex-col gap-9">
            <form onSubmit={e => { e.preventDefault(); handleSubmit(checkup) } }>
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            {t("physical_info")}
                        </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                {t("height")}
                            </label>
                            <div className="flex flex-row">
                                <input
                                    type="number"
                                    defaultValue={checkup.height}
                                    required
                                    onChange={ e => setCheckup({ ...checkup, height: e.target.valueAsNumber })}
                                    placeholder={t("height_placeholder")}
                                    className="text-black dark:text-white w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                <p className="text-black dark:text-white w-11/12 py-3 px-3">{t("cms")}</p>
                            </div>
                        </div>
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                {t("weight")}
                            </label>
                            <div className="flex flex-row">
                                <input
                                    type="number"
                                    defaultValue={checkup.weight}
                                    required
                                    onChange={ e => setCheckup({ ...checkup, weight: e.target.valueAsNumber })}
                                    placeholder={t("weight_placeholder")}
                                    className="text-black dark:text-white w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                <p className="text-black dark:text-white w-11/12 py-3 px-3">{t("kgs")}</p>
                            </div>
                        </div>
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                {t("tension")}
                            </label>
                            <div className="flex flex-row">
                                <input
                                    type="text"
                                    defaultValue={checkup.tension}
                                    required
                                    onChange={ e => setCheckup({ ...checkup, tension: e.target.value })}
                                    pattern="[0-9/]*"
                                    placeholder={t("tension_placeholder")}
                                    className="text-black dark:text-white w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                <p className="text-black dark:text-white w-11/12 py-3 px-3">mmHg</p>
                            </div>
                        </div>
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                {t("brief_complaint")}
                            </label>
                            <textarea
                                rows={6}
                                defaultValue={checkup.complaint}
                                required
                                onChange={ e => setCheckup({ ...checkup, complaint: e.target.value })}
                                placeholder={t("brief_complaint_placeholder")}
                                className="text-black dark:text-white w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={submitting}
                    className="sticky bottom-0 z-50 mt-2 w-full justify-center rounded bg-primary py-5 px-3 font-medium text-2xl text-gray">
                    { submitting && <MiniSpinner /> }
                    Submit
                </button>
            </form>
        </div>
    );
}

export default PhysicalCheckupForm;