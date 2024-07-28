interface MedicineCategory {
    id: number,
    name: string,
}

export const defaultMedicineCategory = {
    id: 0,
    name: "",
}

export const medicineCategoryMapper = (res:Record<string,any>) => {
    let category = defaultMedicineCategory;
    category = { 
      id: res.id,
      name: res.name,
    }
    return category;
}

export type MedicineCategoryCreator = Omit<MedicineCategory, 'id'> & { organization: number };
export const medicineCategoryCreatorMapper = (name:string, orgID:number) => {
    let categoryCreator:MedicineCategoryCreator = {
        name: name,
        organization: orgID,
    }
    return categoryCreator;
};

export default MedicineCategory;