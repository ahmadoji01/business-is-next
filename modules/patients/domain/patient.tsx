export type Patient = {
    id: string,
    name: string,
    fathers_name: string,
    mothers_name: string,
    birthday: Date,
    religion: string,
    job: string,
    education: string,
    marrital_status: string,
    gender: string,
    id_card_number: string,
    address: string,
    family_id_number: string|null
}

export const defaultPatient: Patient = {
    id: "",
    name: "",
    fathers_name: "",
    mothers_name: "",
    birthday: new Date,
    religion: "",
    job: "",
    education: "",
    marrital_status: "",
    gender: "",
    id_card_number: "",
    address: "",
    family_id_number: null
}

export function patientMapper(res:Record<string,any>) {
    let patient = defaultPatient;
    
    if (res == null) {
        return patient;
    }
    
    patient = { 
        id: res.id? res.id:"",
        name: res.name? res.name:'', 
        fathers_name: res.fathers_name? res.fathers_name:'',
        mothers_name: res.mothers_name? res.mothers_name:'',
        birthday: res.birthday? res.birthday:new Date, 
        religion: res.religion? res.religion:'', 
        job: res.job? res.job:'', 
        education: res.education? res.education:'', 
        marrital_status: res.marrital_status? res.marrital_status:'',
        gender: res.gender? res.gender:'',
        id_card_number: res.id_card_number? res.id_card_number:'',
        address: res.address? res.address:'',
        family_id_number: res.family_id_number? res.family_id_number:'',
    }
    return patient;
}

type PatientOrganization = {
    patient_organizations: object,
}

export type PatientNoID = Omit<Patient, 'id'> & PatientOrganization;
export function patientNoIDMapper(patient:Patient, orgID:number) {

    let patientNoID: PatientNoID = { 
        name: patient.name, 
        fathers_name: patient.fathers_name,
        mothers_name: patient.mothers_name,
        birthday: patient.birthday, 
        religion: patient.religion, 
        job: patient.job, 
        education: patient.education, 
        marrital_status: patient.marrital_status,
        gender: patient.gender,
        id_card_number: patient.id_card_number,
        address: patient.address,
        family_id_number: patient.family_id_number,
        patient_organizations: [{ organizations_id: orgID }]
    }
    return patientNoID;
}

export type PatientPatcher = Omit<Patient, 'id'>;
export function patientPatcherMapper(patient:Patient) {

    let patientNoID: PatientPatcher = { 
        name: patient.name, 
        fathers_name: patient.fathers_name,
        mothers_name: patient.mothers_name,
        birthday: patient.birthday, 
        religion: patient.religion, 
        job: patient.job,
        education: patient.education, 
        marrital_status: patient.marrital_status,
        gender: patient.gender,
        id_card_number: patient.id_card_number,
        address: patient.address,
        slug: patient.slug,
        family_id_number: patient.family_id_number,
    }
    return patientNoID;
}