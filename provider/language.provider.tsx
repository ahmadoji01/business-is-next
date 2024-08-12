'use client';
import { createContext, useContext, useEffect, useState } from 'react';
interface LanguageContextType {
    trans: {
        [key: string]: string;
    },
}

export const LanguageContext = createContext<LanguageContextType | null>({
    trans: {},
});
 
export const LanguageProvider = ({
    children, translate
}: {
    children: React.ReactNode;
    translate: object;
}) => {

    const [trans, setTrans] = useState({});
   
    useEffect(() => {
        setTrans(translate);
    }, [translate]);

    return (
        <LanguageContext.Provider value={{ trans }}>
            {children}
        </LanguageContext.Provider>
    );
};
 
export const useLanguageContext = () => {
    const context = useContext(LanguageContext);
    
    if (!context) {
        throw new Error('useThemeContext must be used inside the LanguageProvider');
    }
    
    return context;
};