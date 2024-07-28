'use client';

import { useState } from "react";
import { Treatment } from "../../domain/treatment";
import moment from "moment";
import SubmitButton from "@/components/Dashboard/Submit";

interface TreatmentFormProps {
    initTreatment: Treatment,
    handleSubmit: (treatment:Treatment) => void,
}

const TreatmentForm = ({ initTreatment, handleSubmit }:TreatmentFormProps) => {
    const [treatment, setTreatment] = useState(initTreatment);

    return (
        <>
            <div className="grid gap-9">
                <form onSubmit={e => { e.preventDefault(); handleSubmit(treatment) } }>
                    <div className="flex flex-col gap-9">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="flex flex-col gap-5.5 p-6.5">
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={treatment.name}
                                        required
                                        onChange={ e => setTreatment({ ...treatment, name: e.target.value })}
                                        placeholder="Input Treatment's Name"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                </div>
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        ICD-10 Code
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            defaultValue={treatment.code}
                                            onChange={ e => setTreatment({ ...treatment, code: e.target.value })}
                                            required
                                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            />
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Price
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            defaultValue={treatment.price}
                                            onChange={ e => setTreatment({ ...treatment, price: parseFloat(e.target.value) })}
                                            required
                                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            />
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

export default TreatmentForm;