import { Patient, defaultPatient, patientMapper } from '@/modules/patients/domain/patient';
import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';
 
interface PatientContextType {
    patients: Patient[],
    activePatient: Patient,
    loading: boolean,
    setPatients: Dispatch<SetStateAction<Patient[]>>,
    setActivePatient: Dispatch<SetStateAction<Patient>>,
}

export const PatientContext = createContext<PatientContextType | null>({
    patients: [defaultPatient],
    activePatient: defaultPatient,
    loading: false,
    setPatients: () => {},
    setActivePatient: () => {},
});
 
export const PatientProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [activePatient, setActivePatient] = useState<Patient>(defaultPatient);
    const [loading, setLoading] = useState(false);

    return (
        <PatientContext.Provider value={{ patients, activePatient, loading, setPatients, setActivePatient }}>
            {children}
        </PatientContext.Provider>
    );
};
 
export const usePatientContext = () => {
    const context = useContext(PatientContext);
    
    if (!context) {
        throw new Error('usePatientContext must be used inside the ThemeProvider');
    }
    
    return context;
};