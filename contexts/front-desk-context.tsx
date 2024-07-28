'use client';

import { Doctor, DoctorOrganization, defaultDoctor, doctorMapper, doctorOrgMapper } from '@/modules/doctors/domain/doctor';
import { getAllDoctors, getDoctorsInOrg, getPresentDoctors } from '@/modules/doctors/domain/doctors.actions';
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useRef, useState } from 'react';
import { useUserContext } from './user-context';
import { useVisitContext } from './visit-context';
 
interface FrontDeskContextType {
    presentDoctors: Doctor[],
    activeDoctor: Doctor,
    loading: boolean,
    newQueues: boolean[],
    notifyNewQueue: (doctorId:string) => void,
    setPresentDoctors: Dispatch<SetStateAction<Doctor[]>>,
    setActiveDoctor: Dispatch<SetStateAction<Doctor>>,
    setNewQueues: Dispatch<SetStateAction<boolean[]>>,
}

export const FrontDeskContext = createContext<FrontDeskContextType | null>({
    presentDoctors: [defaultDoctor],
    activeDoctor: defaultDoctor,
    loading: false,
    newQueues: [],
    notifyNewQueue: () => {},
    setPresentDoctors: () => {},
    setActiveDoctor: () => {},
    setNewQueues: () => {},
});
 
export const FrontDeskProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [presentDoctors, setPresentDoctors] = useState<Doctor[]>([]);
    const [activeDoctor, setActiveDoctor] = useState<Doctor>(defaultDoctor);
    const [newQueues, setNewQueues] = useState<boolean[]>([]);
    const [loading, setLoading] = useState(false);
    const presDocsFields = ['id', 'doctors_id.id', 'doctors_id.name', 'doctors_id.specialization', 'status'];
    const {accessToken, user} = useUserContext();
    const {handleDoctorVisits} = useVisitContext();
    
    const notifSound = useRef<HTMLAudioElement | undefined>(
        typeof Audio !== "undefined" ? new Audio('/sounds/notification-sound.mp3') : undefined
    );

    const playNotificationSound = () => {
        if (typeof(notifSound) === 'undefined')
            return;
        notifSound.current?.play();
    }

    useEffect( () => {
        setLoading(true);
        if (user.id === '')
            return;

        getPresentDoctors(accessToken, presDocsFields).then( res => { 
            let docs:Doctor[] = [];
            let newQs:boolean[] = [];
            res?.map( (docOrg) => {
                let org = doctorOrgMapper(docOrg);
                docs.push(org.doctor);
                newQs.push(false);
            });
            setPresentDoctors(docs);
            setNewQueues(newQs);
            if (docs.length >= 1) {
                setActiveDoctor(docs[0]);
                handleDoctorVisits(docs[0].id);
            }
            setLoading(false);
        }).catch( () => {
            setLoading(false);
        });
    }, [user])

    const notifyNewQueue = (doctorId:string) => {
        let key = presentDoctors.findIndex( (doc) => doc.id === doctorId );

        if (key === -1)
            return;
        
        let newQ = [...newQueues];
        newQ[key] = true;
        setNewQueues(newQ);
        playNotificationSound();
    }

    return (
        <FrontDeskContext.Provider value={{ presentDoctors, activeDoctor, loading, newQueues, setNewQueues, notifyNewQueue, setPresentDoctors, setActiveDoctor }}>
            {children}
        </FrontDeskContext.Provider>
    );
};
 
export const useFrontDeskContext = () => {
    const context = useContext(FrontDeskContext);
    
    if (!context) {
        throw new Error('useThemeContext must be used inside the ThemeProvider');
    }
    
    return context;
};