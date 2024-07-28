export interface Treatment {
    id: number,
    name: string,
    code: string,
    price: number,
}

export const defaultTreatment: Treatment = {
    id: 0,
    name: "",
    code: "",
    price: 0,
}

export function treatmentMapper(res:Record<string,any>) {
    let treatment = defaultTreatment;
    treatment = { 
        id: res.id, 
        name: res.name, 
        code: res.code,
        price: res.price,
    }
    return treatment;
}

type Organization = {
    organization: number,
}

export type TreatmentCreator = Omit<Treatment, 'id'> & Organization;
export function treatmentCreatorMapper(treatment:Treatment, orgID:number) {

    let treatmentCreator: TreatmentCreator = { 
        name: treatment.name, 
        code: treatment.code,
        price: treatment.price,
        organization: orgID,
    }
    return treatmentCreator;
}

export type TreatmentOrg = Omit<Treatment, 'id'|'name'|'code'|'price'> & Organization & { treatments_id:number };
export function treatmentOrgMapper(treatment:Treatment, orgID:number) {

    let treatmentOrg: TreatmentOrg = {
        treatments_id: treatment.id,
        organization: orgID,
    }
    return treatmentOrg;
}

export type TreatmentPatcher = Omit<Treatment, 'id'>;
export function treatmentPatcherMapper(treatment:Treatment) {
    let treatmentPatcher: TreatmentPatcher = {
        name: treatment.name, 
        code: treatment.code,
        price: treatment.price,
    }
    return treatmentPatcher;
}