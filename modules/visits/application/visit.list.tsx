import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Pagination } from "@mui/material";
import { Visit } from "../domain/visit";
import moment from 'moment/min/moment-with-locales';
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { DoctorName } from "@/utils/doctor-name-format";
import { useTranslations } from "next-intl";

interface VisitListProps {
  handleModal: (closeModal:boolean, whichModal:boolean) => void,
  visits: Visit[],
  totalPages: number,
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void,
  setActiveVisit: Dispatch<SetStateAction<Visit>>,
}

const VisitList = ({ visits, totalPages, handleModal, handlePageChange, setActiveVisit }:VisitListProps) => {
  
  const t = useTranslations();
  
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex flex-col">
        <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4">
          <div className="text-center p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              {t('visits_date')}
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              {t('patients_name')}
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              {t('doctor_visited')}
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              {t('actions')}
            </h5>
          </div>
        </div>

        {visits?.map((visit, key) => (
          <div
            className={`grid grid-cols-4 ${
              key === visits.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block">
                { moment(visit.date_updated).locale('id').format("Do MMMM YYYY") }
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{visit.patient.name}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{DoctorName(visit.doctor.name, visit.doctor.specialization)}</p>
            </div>

            <div className="items-center justify-center p-2.5 sm:flex xl:p-5">
              <ul className="flex items-center gap-2 2xsm:gap-4">
                <motion.li className="relative" whileHover={{ scale: 1.2, transition: { duration: 0.2 }}} whileTap={{ scale:0.9 }} >  
                  <Link
                    href="#"
                    onClick={() => { handleModal(false, false); setActiveVisit(visit) }}
                    style={{ background: "red" }}
                    className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
                    >
                    <FontAwesomeIcon width={18} height={18} icon={faTrash} style={{ color: 'white' }} />
                  </Link>
                </motion.li>
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className="py-3">
        <Pagination count={totalPages} onChange={handlePageChange} />
      </div>
    </div>
  );
};

export default VisitList;
