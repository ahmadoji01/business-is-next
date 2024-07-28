import { Patient, defaultPatient, patientMapper } from "@/modules/patients/domain/patient";
import { HeadToToeCheckup, defaultHeadToToeCheckup } from "./head-to-toe-checkup";
import { PastMedicalConcern, defaultPastMedicalConcern } from "./past-medical-concern";

export interface PhysicalCheckup {
    id: string,
    past_medical_concern: PastMedicalConcern,
    head_to_toe_checkup: HeadToToeCheckup,
    height: number,
    weight: number,
    tension: string,
    temperature: number,
    breath_rate: number,
    heart_rate: number,
    patient: Patient,
    complaint: string,
}

export const defaultPhysicalCheckup: PhysicalCheckup = {
    id: "",
    past_medical_concern: defaultPastMedicalConcern,
    head_to_toe_checkup: defaultHeadToToeCheckup,
    height: 0,
    weight: 0,
    tension: "",
    temperature: 0,
    breath_rate: 0,
    heart_rate: 0,
    patient: defaultPatient,
    complaint: "",
}

export function physicalCheckupMapper(res:Record<string,any>) {
    let physicalCheckup = defaultPhysicalCheckup;
    physicalCheckup = { 
        id: res.id, 
        past_medical_concern: res.past_medical_concern,
        head_to_toe_checkup: res.head_to_toe_checkup,
        height: res.height,
        weight: res.weight,
        tension: res.tension,
        temperature: res.temperature,
        breath_rate: res.breath_rate,
        heart_rate: res.heart_rate,
        patient: patientMapper(res.patient),
        complaint: res.complaint,
    }
    return physicalCheckup;
}

type ForeignKeys = {
    organization: number,
    patient: string,
}

export type PhysicalCheckupNoID = Omit<PhysicalCheckup, 'id' | 'patient'> & ForeignKeys;
export function physicalCheckupNoIDMapper(checkup:PhysicalCheckup, orgID:number, patientID:string) {

    let physicalCheckupNoID: PhysicalCheckupNoID = { 
        past_medical_concern: checkup.past_medical_concern,
        head_to_toe_checkup: checkup.head_to_toe_checkup,
        height: checkup.height,
        weight: checkup.weight,
        tension: checkup.tension,
        temperature: checkup.temperature,
        breath_rate: checkup.breath_rate,
        heart_rate: checkup.heart_rate,
        complaint: checkup.complaint,
        organization: orgID,
        patient: patientID,
    }
    return physicalCheckupNoID;
}

export type PhysicalCheckupPatcher = Omit<PhysicalCheckup, 'patient'> & { organization: number };
export function physicalCheckupPatcherMapper(checkup:PhysicalCheckup, orgID:number) {

    let physicalCheckupPatcher: PhysicalCheckupPatcher = { 
        id: checkup.id,
        past_medical_concern: checkup.past_medical_concern,
        head_to_toe_checkup: checkup.head_to_toe_checkup,
        height: checkup.height,
        weight: checkup.weight,
        tension: checkup.tension,
        temperature: checkup.temperature,
        breath_rate: checkup.breath_rate,
        heart_rate: checkup.heart_rate,
        complaint: checkup.complaint,
        organization: orgID,
    }
    return physicalCheckupPatcher;
}