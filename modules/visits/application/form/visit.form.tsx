'use client';

import { useState } from "react";
import moment from "moment";
import SubmitButton from "@/components/Dashboard/Submit";
import { Visit } from "../../domain/visit";
import { VISIT_STATUS } from "../../domain/visit.constants";

interface VisitFormProps {
    initVisit: Visit,
    handleSubmit: (visit:Visit) => void,
}

const VisitForm = ({ initVisit, handleSubmit }:VisitFormProps) => {
    const [visit, setVisit] = useState(initVisit);

    return (
        <>
            <div className="grid gap-9">
                <form onSubmit={e => { e.preventDefault(); handleSubmit(visit) } }>
                    <div className="flex flex-col gap-9">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    Patient Information
                                </h3>
                            </div>
                            <div className="flex flex-col gap-5.5 p-6.5">
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Patient's Name
                                    </label>
                                    <div className="relative font-bold">
                                        { visit.patient?.name }
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Doctor's Name
                                    </label>
                                    <div className="relative font-bold">
                                        { visit.doctor?.name }
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Visit Status
                                    </label>
                                    <div className="relative z-20 bg-white dark:bg-form-input">
                                        <select 
                                            name="status"
                                            required
                                            defaultValue={visit.status}
                                            onChange={ e => setVisit({ ...visit, status: e.target.value }) }
                                            className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                            >
                                            <option value=""></option>
                                            <option value={VISIT_STATUS.waiting}>Waiting</option>
                                            <option value={VISIT_STATUS.temporary_leave}>Temporary Leave</option>
                                            <option value={VISIT_STATUS.to_be_examined}>To be Examined</option>
                                            <option value={VISIT_STATUS.examining}>Examining</option>
                                            <option value={VISIT_STATUS.examined}>Examined</option>
                                            <option value={VISIT_STATUS.active}>Active</option>
                                            <option value={VISIT_STATUS.inactive}>Inactive</option>
                                            <option value={VISIT_STATUS.cancelled}>Cancelled</option>
                                        </select>
                                    </div>
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

export default VisitForm;