'use client';

import { useState } from "react";
import { Staff } from "../../domain/staff";
import moment from "moment";
import SubmitButton from "@/components/Dashboard/Submit";
import { useTranslations } from "next-intl";

interface StaffFormProps {
    initStaff: Staff,
    handleSubmit: (staff:Staff) => void,
}

const StaffForm = ({ initStaff, handleSubmit }:StaffFormProps) => {
    const [staff, setStaff] = useState(initStaff);
    const t = useTranslations();

    return (
        <>
            <div className="grid gap-9">
                <form onSubmit={e => { e.preventDefault(); handleSubmit(staff) } }>
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
                                        defaultValue={staff.name}
                                        required
                                        onChange={ e => setStaff({ ...staff, name: e.target.value })}
                                        placeholder={t('input_staffs_full_name')}
                                        className="text-black dark:text-white w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                </div>
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        {t('birthday')}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            defaultValue={moment(staff.birthday).format("YYYY-MM-DD")}
                                            onChange={ e => setStaff({ ...staff, birthday: new Date(e.target.value) })}
                                            required
                                            className="text-black dark:text-white custom-input-date custom-input-date-2 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            />
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        {t('marrital_status')}
                                    </label>
                                    <div className="relative z-20 bg-white dark:bg-form-input">
                                        <select 
                                            defaultValue={staff.marrital_status}
                                            onChange={ e => setStaff({ ...staff, marrital_status: e.target.value }) }
                                            required 
                                            className="text-black dark:text-white relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                            >
                                            <option value="single">{ t("single") }</option>
                                            <option value="married">{ t("married") }</option>
                                            <option value="divorced">{ t("divorced") }</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        {t('education')}
                                    </label>
                                    <div className="relative z-20 bg-white dark:bg-form-input">
                                        <select 
                                            defaultValue={staff.education}
                                            onChange={ e => setStaff({ ...staff, education: e.target.value }) }
                                            className="text-black dark:text-white relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                            >
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
                                    {t('resident_information')}
                                </h3>
                            </div>
                            <div className="flex flex-col gap-5.5 p-6.5">
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        {t('resident_number')}
                                    </label>
                                    <input
                                        defaultValue={staff.id_card_number}
                                        onChange={ e => setStaff({ ...staff, id_card_number: e.target.value }) }
                                        type="text"
                                        placeholder={t('input_resident_number')}
                                        className="text-black dark:text-white w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                </div>
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        {t('family_id')}
                                    </label>
                                    <input
                                        defaultValue={staff.family_id_number}
                                        onChange={ e => setStaff({ ...staff, family_id_number: e.target.value }) }
                                        type="text"
                                        placeholder={t('input_family_id')}
                                        className="text-black dark:text-white w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                </div>
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        {t('address')}
                                    </label>
                                    <input
                                        defaultValue={staff.address}
                                        onChange={ e => setStaff({ ...staff, address: e.target.value }) }
                                        type="text"
                                        placeholder={t('input_address')}
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

export default StaffForm;