'use client';

import { ChangeEvent, SelectHTMLAttributes, useEffect, useState } from "react";
import { ROLES } from "../../domain/users.constants";
import { User, UserRole, defaultUser } from "../../domain/user";
import { Doctor, defaultDoctor } from "@/modules/doctors/domain/doctor";
import { Staff, defaultStaff } from "@/modules/staffs/domain/staff";
import DoctorAccountForm from "./doctor-account.form";
import StaffAccountForm from "./staff-account.form";
import SubmitButton from "@/components/Dashboard/Submit";
import { useTranslations } from "next-intl";

interface UserFormProps {
    initUser: User,
    initRoles: UserRole[],
    initRole?: string,
    handleSubmit: (user:User, doctor:Doctor, staff:Staff, role:string) => void,
}

const UserForm = ({ initUser, initRoles, initRole = "", handleSubmit }:UserFormProps) => {

    const [user, setUser] = useState(initUser);
    const [roles, setRoles] = useState(initRoles);
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedRoleName, setSelectedRoleName] = useState("");
    const [doctor, setDoctor] = useState(defaultDoctor);
    const [staff, setStaff] = useState(defaultStaff);

    const t = useTranslations();

    useEffect( () => {
        setRoles(initRoles);
    }, [initRoles]);

    const roleChange = (e:ChangeEvent<HTMLSelectElement>) => {
        let index = e.target.selectedIndex;
        let label = e.target[index].textContent;
        let role = e.target.value; 
        if ((selectedRoleName === ROLES.doctor && role !== ROLES.doctor) || (selectedRoleName !== ROLES.doctor && role === ROLES.doctor)) {
            setDoctor(defaultDoctor);
            setStaff(defaultStaff);
        }
        setSelectedRole(e.target.value);
        setSelectedRoleName(label? label : "");
    }

    return (
        <form onSubmit={ e => { e.preventDefault(); handleSubmit(user, doctor, staff, selectedRole) }}>
            <div className="grid gap-9 mb-6">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                {t("account_info")}
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    {t('email')}
                                </label>
                                <input
                                    onChange={ e => setUser({ ...user, email: e.target.value })}
                                    type="text"
                                    placeholder={t("input_email")}
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    {t('password')}
                                </label>
                                <input
                                    onChange={ e => setUser({ ...user, password: e.target.value })}
                                    minLength={8}
                                    type="password"
                                    placeholder={t("input_password")}
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    {t('role')}
                                </label>
                                <div className="relative z-20 bg-white dark:bg-form-input">
                                    <select
                                        defaultValue={initRole}
                                        required 
                                        onChange={e =>  { roleChange(e) }} className="custom-input-date custom-input-date-2 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                                        <option value="">{t("choose_role")}</option>
                                        { roles?.map( (role, key) => (
                                            <option key={key} value={role.id}>{role.name}</option>
                                        )) 
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            { selectedRoleName === ROLES.doctor ?
                <DoctorAccountForm doctor={doctor} setDoctor={setDoctor} />
                : selectedRoleName !== "" && <StaffAccountForm staff={staff} setStaff={setStaff} />
            }
            <SubmitButton />
        </form>
    )
}

export default UserForm;