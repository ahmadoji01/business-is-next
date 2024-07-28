import { Visit, defaultVisit, visitMapper } from '@/modules/visits/domain/visit';
import { getAllVisits, getVisitByDoctorID, getVisitsWithFilter } from '@/modules/visits/domain/visits.actions';
import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';
import { useUserContext } from './user-context';
import { Patient, defaultPatient } from '@/modules/patients/domain/patient';
import { doctorIDEquals, statusEquals } from '@/modules/visits/domain/visit.specifications';
import { VISIT_STATUS } from '@/modules/visits/domain/visit.constants';
 
interface VisitContextType {
    doctorVisits: Visit[],
    activePatient: Patient,
    activeVisit: Visit,
    loading: boolean,
    setActivePatient: Dispatch<SetStateAction<Patient>>,
    setActiveVisit: Dispatch<SetStateAction<Visit>>,
    setDoctorVisits: Dispatch<SetStateAction<Visit[]>>,
    handleDoctorVisits: (doctorID:string) => void,
}

export const VisitContext = createContext<VisitContextType | null>({
    doctorVisits: [],
    activePatient: defaultPatient,
    activeVisit: defaultVisit,
    loading: false,
    setActivePatient: () => {},
    setActiveVisit: () => {},
    setDoctorVisits: () => {},
    handleDoctorVisits: () => {},
});
 
export const VisitProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [doctorVisits, setDoctorVisits] = useState<Visit[]>([]);
    const [activePatient, setActivePatient] = useState<Patient>(defaultPatient);
    const [activeVisit, setActiveVisit] = useState<Visit>(defaultVisit);
    const [loading, setLoading] = useState(false);
    const {accessToken} = useUserContext();
    const fields = ['id', 'date_updated', 'patient.id', 'patient.name', 'patient.id_card_number', 'patient.family_id_number', 'doctor.id', 'doctor.name', 'queue_number', 'doctor.specialization', 'status', 'medical_record.id'];

    const handleDoctorVisits = (doctorID:string) => {
        setLoading(true);
        let filter = { _and: [ doctorIDEquals(doctorID), { _or: [statusEquals(VISIT_STATUS.waiting), statusEquals(VISIT_STATUS.temporary_leave)] } ] }
        getVisitsWithFilter(accessToken, filter, 'date_created', 1, fields).then( res => {
            let vits:Visit[] = [];
            res?.map( (visit) => { vits.push(visitMapper(visit)); });
            setDoctorVisits(vits);
            setLoading(false);
        }).catch( err => {
            setLoading(false);
        })
    }

    return (
        <VisitContext.Provider value={{ activeVisit, loading, doctorVisits, activePatient, setActivePatient, setActiveVisit, setDoctorVisits, handleDoctorVisits }}>
            {children}
        </VisitContext.Provider>
    );
};
 
export const useVisitContext = () => {
    const context = useContext(VisitContext);
    
    if (!context) {
        throw new Error('useThemeContext must be used inside the ThemeProvider');
    }
    
    return context;
};