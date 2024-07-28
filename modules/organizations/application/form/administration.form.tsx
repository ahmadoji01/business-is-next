import SubmitButton from "@/components/Dashboard/Submit";
import { Organization } from "../../domain/organization";
import { ChangeEvent, useEffect, useState } from "react";
import defaultLogo from "@/public/images/clinic-icon-256.jpg";
import { imageHandler } from "@/utils/request-handler";
import { useTranslations } from "next-intl";

interface AdministrationFormProps {
    initOrg: Organization,
    handleSubmit: (org:Organization) => void,
    handleFileChange: (e: ChangeEvent<HTMLInputElement>) => {};
}

const AdministrationForm = ({ initOrg, handleSubmit, handleFileChange }: AdministrationFormProps) => {

    const [organization, setOrganization] = useState(initOrg);
    const [logo, setLogo] = useState(defaultLogo.src);
    const t = useTranslations();

    useEffect(() => { setOrganization(initOrg) }, [initOrg]);

    useEffect(() => {
        if (organization.logo !== null) {
            setLogo(imageHandler(organization.logo.id, organization.logo.filename_download));
        }
    }, [organization]);

    return (
        <>
            <div className="grid gap-9" key={organization.id}>
                <form onSubmit={e => { e.preventDefault(); handleSubmit(organization) } }>
                    <div className="flex flex-col gap-9">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    { t('clinic_information') }    
                                </h3>
                            </div>
                            <div className="flex flex-col gap-5.5 p-6.5">
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        { t('clinics_name') }    
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={organization.name}
                                        required
                                        onChange={ e => setOrganization({ ...organization, name: e.target.value })}
                                        placeholder={ t('input_clinics_name') }
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                </div>
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        { t('tax_rate') }    
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            defaultValue={organization.tax_rate}
                                            required
                                            onChange={ e => setOrganization({ ...organization, tax_rate: parseInt(e.target.value) })}
                                            className="custom-input-date custom-input-date-2 mr-2 w-1/4 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            />
                                        <span className="w-1/4 font-xl">%</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                        <div className="relative z-30 mx-auto h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
                                            <div className="relative drop-shadow-2">
                                                <img src={logo} width={160} height={160} className="shadow-lg rounded-full max-w-full h-auto align-middle border-none" />
                                                    <label
                                                        htmlFor="profile"
                                                        className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                                                        >
                                                        <svg
                                                        className="fill-current"
                                                        width="14"
                                                        height="14"
                                                        viewBox="0 0 14 14"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                                                            fill=""
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                                                            fill=""
                                                        />
                                                        </svg>
                                                        <input
                                                            type="file"
                                                            name="profile"
                                                            id="profile"
                                                            className="sr-only"
                                                            onChange={handleFileChange}
                                                            />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-5.5 p-6.5">
                                            <div>
                                                <label className="mb-3 block text-black dark:text-white">
                                                    { t('change_clinics_logo') }    
                                                </label>
                                                <input
                                                    onChange={handleFileChange}
                                                    type="file"
                                                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                                                    />
                                            </div>
                                        </div>
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

export default AdministrationForm;