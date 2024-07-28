import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
 
interface DataModalContextType {
    editModalOpen: boolean,
    deleteModalOpen: boolean,
    setEditModalOpen: Dispatch<SetStateAction<boolean>>,
    setDeleteModalOpen: Dispatch<SetStateAction<boolean>>,
    closeModal: () => void,
    handleModal: (closeModal: boolean, whichModal: boolean) => void,
}

export const DataModalContext = createContext<DataModalContextType | null>({
    editModalOpen: false,
    deleteModalOpen: false,
    setEditModalOpen: () => {},
    setDeleteModalOpen: () => {},
    closeModal: () => {},
    handleModal: () => {},
});
 
export const DataModalProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

    const handleModal = (closeModal:boolean, whichModal: boolean) => {
        if(closeModal) {
          setEditModalOpen(false);
          setDeleteModalOpen(false);
          return;
        }
        
        if (whichModal) {
          setEditModalOpen(true);
          setDeleteModalOpen(false);
          return;
        } 

        setEditModalOpen(false);
        setDeleteModalOpen(true);
        return;
    }

    const closeModal = () => {
        setEditModalOpen(false);
        setDeleteModalOpen(false);
    }

    return (
        <DataModalContext.Provider value={{ editModalOpen, deleteModalOpen, setEditModalOpen, setDeleteModalOpen, closeModal, handleModal }}>
            {children}
        </DataModalContext.Provider>
    );
};
 
export const useDataModalContext = () => {
    const context = useContext(DataModalContext);
    
    if (!context) {
        throw new Error('useThemeContext must be used inside the ThemeProvider');
    }
    
    return context;
};