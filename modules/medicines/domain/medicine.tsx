import MedicineCategory, { MedicineCategoryCreator, defaultMedicineCategory, medicineCategoryCreatorMapper } from "./medicine-category";

export interface Medicine {
    id: number,
    code: string,
    name: string,
    stock: number,
    category: MedicineCategory,
    price: number,
}

export const defaultMedicine: Medicine = {
    id: 0,
    code: "",
    name: "",
    stock: 0,
    category: defaultMedicineCategory,
    price: 0,
}

export function medicineMapper(res:Record<string,any>) {
    let medicine = defaultMedicine;
    medicine = { 
        id: res.id, 
        name: res.name, 
        code: res.code,
        price: res.price,
        stock: res.stock,
        category: res.category,
    }
    return medicine;
}

type Organization = {
    organization: number,
}

export type MedicineCreator = Omit<Medicine, 'id'|'category'> & { category:number, organization: number };
export function medicineCreatorMapper(medicine:Medicine, catID:number, orgID:number) {

    let medicineCreator: MedicineCreator = { 
        name: medicine.name, 
        code: medicine.code,
        price: medicine.price,
        stock: medicine.stock,
        category: catID,
        organization: orgID,
    }
    return medicineCreator;
}

export type MedicinePatcher = Omit<Medicine, 'id'>;
export function medicinePatcherMapper(medicine:Medicine) {
    let medicinePatcher:MedicinePatcher = {
        name: medicine.name, 
        code: medicine.code,
        price: medicine.price,
        stock: medicine.stock,
        category: medicine.category,
    }
    return medicinePatcher;
}