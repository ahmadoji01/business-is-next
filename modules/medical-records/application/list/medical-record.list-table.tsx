import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { MedicalRecord } from "../../domain/medical-record";
import { Pagination } from "@mui/material";
import moment from 'moment/min/moment-with-locales';
import { DoctorName } from "@/utils/doctor-name-format";
import { useTranslations } from "next-intl";

interface MedicalRecordListTableProps {
  handleModal: (closeModal:boolean, whichModal:boolean) => void,
  medicalRecords: MedicalRecord[],
  totalPages: number,
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void,
  setActiveMedicalRecord: Dispatch<SetStateAction<MedicalRecord>>
}

const MedicalRecordListTable = ({ medicalRecords, setActiveMedicalRecord, totalPages, handlePageChange, handleModal }: MedicalRecordListTableProps) => {

  const t = useTranslations();

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              { t("patients_name") }
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              { t("doctor_visited") }
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              { t("visits_date") }
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              { t("medicine_treatment") }
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              { t("actions") }
            </h5>
          </div>
        </div>

        {typeof(medicalRecords) !== "undefined" && medicalRecords.map((record, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === medicalRecords.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex justify p-2.5 xl:p-5">
              <p className="text-meta-3">{record.patient?.name}</p>
            </div>

            <div className="flex justify p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{DoctorName(record.doctor?.name, record.doctor?.specialization)}</p>
            </div>

            <div className="hidden justify-center sm:flex p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{moment(record.date_updated).locale("id").format("Do MMMM YYYY")}</p>
            </div>

            <div className="hidden justify p-2.5 sm:flex xl:p-5 text-black dark:text-white w-full">
              <ul className="list-outside" style={{ listStyle: "auto" }}>
                {record.items?.map( (item,key) => <li key={key}>{item.items_id.name}</li> )}
              </ul>
            </div>
            

            <div className="items-center justify-center p-2.5 sm:flex xl:p-5">
              <ul className="flex gap-2 2xsm:gap-4">
                <motion.li className="relative" whileHover={{ scale: 1.2, transition: { duration: 0.2 }}} whileTap={{ scale:0.9 }} >  
                  <Link
                    href="#"
                    onClick={() => { handleModal(false, true); setActiveMedicalRecord(record) }}
                    className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
                    >
                    <FontAwesomeIcon width={18} height={18} icon={faEye} />
                  </Link>
                </motion.li>
                <motion.li className="relative" whileHover={{ scale: 1.2, transition: { duration: 0.2 }}} whileTap={{ scale:0.9 }} >  
                  <Link
                    href="#"
                    onClick={() => { handleModal(false, false); setActiveMedicalRecord(record) }}
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
        <div className="py-3">
          <Pagination count={totalPages} onChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordListTable;
