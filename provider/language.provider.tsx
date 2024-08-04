import { getDictionary } from '@/app/dictionaries';
import { createContext, useContext } from 'react';
interface LanguageContextType {
    trans: {
        [key: string]: string;
    },
}

export const LanguageContext = createContext<LanguageContextType | null>({
    trans: {},
});
 
export const LanguageProvider = async ({
    children, lang
}: {
    children: React.ReactNode;
    lang: "en" | "id";
}) => {

    let trans = await getDictionary(lang);

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