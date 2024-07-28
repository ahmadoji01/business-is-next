'use client';

import { useState } from "react";
import { Patient } from "../../domain/patient";
import moment from "moment";
import SubmitButton from "@/components/Dashboard/Submit";
import { useTranslations } from "next-intl";

interface PatientFormProps {
    initPatient: Patient,
    handleSubmit: (patient:Patient) => void,
}

const PatientForm = ({ initPatient, handleSubmit }:PatientFormProps) => {
    const [patient, setPatient] = useState(initPatient);
    const t = useTranslations();

    return (
        <>
            <div className="grid gap-9">
                <form onSubmit={e => { e.preventDefault(); handleSubmit(patient) } }>
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
                                    <input
                                        type="text"
                                        defaultValue={patient.name}
                                        required
                                        name="name"
                                        onChange={ e => setPatient({ ...patient, name: e.target.value })}
                                        placeholder={ t('input_full_name') }
                                        className="text-black dark:text-white w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                </div>
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        { t('birthday') }
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            name="birthday"
                                            defaultValue={moment(patient.birthday).format("YYYY-MM-DD")}
                                            onChange={ e => setPatient({ ...patient, birthday: new Date(e.target.value) })}
                                            required
                                            className="text-black dark:text-white custom-input-date custom-input-date-2 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            />
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Gender
                                    </label>
                                    <div className="relative z-20 bg-white dark:bg-form-input">
                                        <select
                                            defaultValue={patient.gender}
                                            name="gender"
                                            onChange={ e => setPatient({ ...patient, gender: e.target.value })} 
                                            required 
                                            className="text-black dark:text-white relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                            >
                                            <option value=""></option>
                                            <option value="male">{ t('male') }</option>
                                            <option value="female">{ t('female') }</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        { t('marrital_status') }
                                    </label>
                                    <div className="relative z-20 bg-white dark:bg-form-input">
                                        <select 
                                            defaultValue={patient.marrital_status}
                                            name="marrital_status"
                                            onChange={ e => setPatient({ ...patient, marrital_status: e.target.value }) }
                                            required 
                                            className="text-black dark:text-white relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                            >
                                            <option value=""></option>
                                            <option value="single">{ t('single') }</option>
                                            <option value="married">{ t('married') }</option>
                                            <option value="divorced">{ t('divorced') }</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    { t('family_information') }
                                </h3>
                            </div>
                            <div className="flex flex-col gap-5.5 p-6.5">
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        { t('family_id') }
                                    </label>
                                    <input
                                        name="family_id_number"
                                        defaultValue={patient.family_id_number? patient.family_id_number : ''}
                                        onChange={ e => setPatient({ ...patient, family_id_number: e.target.value }) }
                                        type="text"
                                        placeholder={ t('input_family_id') }
                                        className="text-black dark:text-white w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                </div>
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        { t('fathers_name') }
                                    </label>
                                    <input
                                        name="fathers_name"
                                        defaultValue={patient.fathers_name}
                                        onChange={ e => setPatient({ ...patient, fathers_name: e.target.value }) }
                                        type="text"
                                        placeholder={ t('input_fathers_name') }
                                        className="text-black dark:text-white w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                </div>
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        { t('mothers_name') }
                                    </label>
                                    <input
                                        name="mothers_name"
                                        defaultValue={patient.mothers_name}
                                        onChange={ e => setPatient({ ...patient, mothers_name: e.target.value }) }
                                        type="text"
                                        placeholder={ t('input_mothers_name') }
                                        className="text-black dark:text-white w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    { t('professional_information') }
                                </h3>
                            </div>
                            <div className="flex flex-col gap-5.5 p-6.5">
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        { t('occupation') }
                                    </label>
                                    <input
                                        name="job"
                                        defaultValue={patient.job}
                                        onChange={ e => setPatient({ ...patient, job: e.target.value }) }
                                        type="text"
                                        required
                                        placeholder={ t('input_occupation') }
                                        className="text-black dark:text-white w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                </div>
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        { t('education') }
                                    </label>
                                    <div className="relative z-20 bg-white dark:bg-form-input">
                                        <select 
                                            name="education"
                                            required
                                            defaultValue={patient.education}
                                            onChange={ e => setPatient({ ...patient, education: e.target.value }) }
                                            className="text-black dark:text-white text-black dark:text-white relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                            >
                                            <option value=""></option>
                                            <option value="uneducated">{t('education_levels.uneducated')}</option>
                                            <option value="elementary">{t('education_levels.elementary')}</option>
                                            <option value="junior_secondary">{t('education_levels.junior_secondary')}</option>
                                            <option value="senior_secondary">{t('education_levels.senior_secondary')}</option>
                                            <option value="associate">{t('education_levels.associate')}</option>
                                            <option value="bachelor">{t('education_levels.bachelor')}</option>
                                            <option value="master">{t('education_levels.master')}</option>
                                            <option value="doctorate">{t('education_levels.doctorate')}</option>
                                            <option value="postdoctorate">{t('education_levels.postdoctorate')}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    { t('resident_information') }
                                </h3>
                            </div>
                            <div className="flex flex-col gap-5.5 p-6.5">
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        { t('resident_number') }
                                    </label>
                                    <input
                                        name="id_card_number"
                                        defaultValue={patient.id_card_number}
                                        type="text"
                                        onChange={ e => setPatient({ ...patient, id_card_number: e.target.value }) }
                                        required
                                        placeholder={ t('input_resident_number') }
                                        className="text-black dark:text-white w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                </div>
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        { t('address') }
                                    </label>
                                    <input
                                        name="address"
                                        defaultValue={patient.address}
                                        type="text"
                                        onChange={ e => setPatient({ ...patient, address: e.target.value }) }
                                        required
                                        placeholder={ t('input_address') }
                                        className="text-black dark:text-white w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                </div>
                            </div>
                        </div>
                    </div>
                    <SubmitButton />
                </form>
            </div>
        </>
    )
}

export default PatientForm;