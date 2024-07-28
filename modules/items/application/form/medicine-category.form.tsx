'use client';

import SubmitButton from '@/components/Dashboard/Submit';
import { useState } from 'react';
import MedicineCategory from '../../domain/medicine-category';

interface MedicineCategoryFormProps {
    initCategory: MedicineCategory,
    handleSubmit: (category:MedicineCategory) => void,
}

const MedicineCategoryForm = ({ initCategory, handleSubmit }:MedicineCategoryFormProps) => {
    const [category, setCategory] = useState(initCategory);

    return (
        <>
            <div className="grid gap-9">
                <form onSubmit={e => { e.preventDefault(); handleSubmit(category) } }>
                    <div className="flex flex-col gap-9">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="flex flex-col gap-5.5 p-6.5">
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Name
                                    </label>
                                    <input
                                        type="text" 
                                        defaultValue={category.name}
                                        required
                                        onChange={ e => setCategory({ ...category, name: e.target.value })}
                                        placeholder="Input Category Name"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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

export default MedicineCategoryForm;