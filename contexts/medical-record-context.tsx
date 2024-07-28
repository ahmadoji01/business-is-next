import { MedicalRecord, MedicineDoses, defaultMedicalRecord, defaultMedicineDoses, medicalRecordMapper } from '@/modules/medical-records/domain/medical-record';
import { getAMedicalRecord } from '@/modules/medical-records/domain/medical-records.actions';
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { useUserContext } from './user-context';
import { useAlertContext } from './alert-context';
import { useTranslations } from 'next-intl';
 
interface MedicalRecordContextType {
    medicalRecords: MedicalRecord[],
    activeMedicalRecord: MedicalRecord,
    activeMRID: number,
    medicineDoses: MedicineDoses[],
    loading: boolean,
    setMedicalRecords: Dispatch<SetStateAction<MedicalRecord[]>>,
    setActiveMedicalRecord: Dispatch<SetStateAction<MedicalRecord>>,
    setActiveMRID: Dispatch<SetStateAction<number>>,
    setMedicineDoses: Dispatch<SetStateAction<MedicineDoses[]>>,
    setLoading: Dispatch<SetStateAction<boolean>>,
}

export const MedicalRecordContext = createContext<MedicalRecordContextType | null>({
    medicalRecords: [defaultMedicalRecord],
    activeMedicalRecord: defaultMedicalRecord,
    activeMRID: 0,
    medicineDoses: [defaultMedicineDoses],
    loading: false,
    setMedicalRecords: () => {},
    setActiveMedicalRecord: () => {},
    setActiveMRID: () => {},
    setMedicineDoses: () => {},
    setLoading: () => {},
});
 
export const MedicalRecordProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
    const [medicineDoses, setMedicineDoses] = useState<MedicineDoses[]>([]);
    const [activeMedicalRecord, setActiveMedicalRecord] = useState<MedicalRecord>(defaultMedicalRecord);
    const [activeMRID, setActiveMRID] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const {accessToken} = useUserContext();
    const {openSnackbarNotification} = useAlertContext();
    const t = useTranslations();

    useEffect(() => {
        if (activeMRID === 0)
            return;
        setLoading(true);
        getAMedicalRecord(accessToken, activeMRID)
        .then(res => {
            setActiveMedicalRecord(medicalRecordMapper(res));
            setLoading(false);
        }).catch(() => { openSnackbarNotification(t('alert_msg.server_error'), 'error'); setLoading(false); });
    }, [activeMRID])

    return (
        <MedicalRecordContext.Provider value={{ medicalRecords, activeMedicalRecord, activeMRID, medicineDoses, loading, setActiveMRID, setLoading, setMedicineDoses, setMedicalRecords, setActiveMedicalRecord }}>
            {children}
        </MedicalRecordContext.Provider>
    );
};
 
export const useMedicalRecordContext = () => {
    const context = useContext(MedicalRecordContext);
    
    if (!context) {
        throw new Error('useMedicalRecordContext must be used inside the ThemeProvider');
    }
    
    return context;
};