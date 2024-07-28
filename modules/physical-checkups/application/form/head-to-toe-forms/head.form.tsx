
const HeadForm = () => {
    return (
        <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-col gap-5.5 p-6.5">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Head Shape
                        </label>
                        <select className="celative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                            <option value="Round, Small, Symmetrical">Round, Small, Symmetrical</option>
                            <option value="Round, Small, Asymmetrical">Round, Small, Asymmetrical</option>
                            <option value="Round, Big, Symmetrical">Round, Big, Symmetrical</option>
                            <option value="Round, Big, Asymmetrical">Round, Big, Asymmetrical</option>
                            <option value="Oval, Small, Symmetrical">Oval, Small, Symmetrical</option>
                            <option value="Oval, Small, Asymmetrical">Oval, Small, Asymmetrical</option>
                            <option value="Oval, Big, Symmetrical">Oval, Big, Symmetrical</option>
                            <option value="Oval, Big, Asymmetrical">Oval, Big, Asymmetrical</option>
                        </select>
                    </div>
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Head Position
                        </label>
                        <select className="celative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                            <option value="Straight">Straight</option>
                            <option value="Not Straight">Not Straight</option>
                        </select>
                    </div>
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Head Skin
                        </label>
                        <input
                            type="text"
                            placeholder="Input Patient's Head Skin Condition"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                    </div>
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Hair
                        </label>
                        <input
                            type="text"
                            placeholder="Input Your Full Name"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                    </div>
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Heart Rate
                        </label>
                        <input
                            type="text"
                            placeholder="Input Your Full Name"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                    </div>
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Conditions
                        </label>
                        <div className="relative z-20 bg-white dark:bg-form-input">
                            <select className="celative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                                <option value="">Male</option>
                                <option value="">Female</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Initial Diagnosis
                        </label>
                        <input
                            type="textarea"
                            placeholder="Input Your Full Name"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                    </div>
                </div>
            </div>
        </div>
    )
}