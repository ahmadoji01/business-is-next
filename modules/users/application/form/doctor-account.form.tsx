'use client';

import { Dispatch, SetStateAction, useState } from "react";
import moment from "moment";
import { Doctor } from "@/modules/doctors/domain/doctor";
import { useTranslations } from "next-intl";

interface DoctorFormProps {
    doctor: Doctor,
    setDoctor: Dispatch<SetStateAction<Doctor>>,
}

const DoctorAccountForm = ({ doctor, setDoctor }:DoctorFormProps) => {

    const t = useTranslations();

    return (
        <>
            <div className="grid gap-9">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                {t('personal_information')}
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    {t('full_name')}
                                </label>
                                <input
                                    type="text"
                                    defaultValue={doctor.name}
                                    required
                                    onChange={ e => setDoctor({ ...doctor, name: e.target.value })}
                                    placeholder={ t("input_doctors_name") }
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    {t('birthday')}
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        defaultValue={moment(doctor.birthday).format('YYYY-MM-DD')}
                                        required
                                        onChange={ e => setDoctor({ ...doctor, birthday: new Date(e.target.value) })}
                                        className="custom-input-date custom-input-date-2 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Gender
                                </label>
                                <div className="relative z-20 bg-white dark:bg-form-input">
                                    <select 
                                        defaultValue={doctor.gender}
                                        required
                                        onChange={ e => setDoctor({ ...doctor, gender: e.target.value })}    
                                        className="celative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                                        <option value="male">{ t("male") }</option>
                                        <option value="female">{ t("female") }</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    {t('marrital_status')}
                                </label>
                                <div className="relative z-20 bg-white dark:bg-form-input">
                                    <select
                                        defaultValue={doctor.marrital_status}
                                        required
                                        onChange={ e => setDoctor({ ...doctor, marrital_status: e.target.value })}     
                                        className="celative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                                        <option value="single">{ t("single") }</option>
                                        <option value="married">{ t("married") }</option>
                                        <option value="divorced">{ t("divorced") }</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    {t('address')}
                                </label>
                                <input
                                    type="text"
                                    defaultValue={doctor.address}
                                    onChange={ e => setDoctor({ ...doctor, address: e.target.value }) }
                                    required
                                    placeholder={ t("input_doctors_address") }
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                { t("professional_information") }
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    { t("license_number") }
                                </label>
                                <input
                                    type="text"
                                    defaultValue={doctor.license_number}
                                    onChange={ e => setDoctor({ ...doctor, license_number: e.target.value }) }
                                    required
                                    placeholder={ t("input_doctors_license_number") }
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    { t("education") }
                                </label>
                                <div className="relative z-20 bg-white dark:bg-form-input">
                                    <select
                                        defaultValue={doctor.education}
                                        required
                                        onChange={ e => setDoctor({ ...doctor, education: e.target.value })}     
                                        className="celative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                                        <option value="general">{ t("general") }</option>
                                        <option value="specialist">{ t("specialist") }</option>
                                    </select>
                                </div>
                            </div>
                            { doctor.education === 'specialist' && 
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        { t("specialization") }
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={doctor.specialization}
                                        onChange={ e => setDoctor({ ...doctor, specialization: e.target.value }) }
                                        required
                                        placeholder={ t("input_doctors_specialization") }
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DoctorAccountForm;