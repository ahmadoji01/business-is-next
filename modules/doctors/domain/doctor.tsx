import { Organization, defaultOrganization, organizationMapper } from "@/modules/organizations/domain/organization";
import { DOCTOR_STATUS } from "./doctor.constants";

export interface Doctor {
    id: string,
    name: string,
    birthday: Date,
    gender: string,
    marrital_status: string,
    address: string,
    license_number: string,
    education: string,
    specialization: string,
}

export const defaultDoctor: Doctor = {
    id: "",
    name: "",
    birthday: new Date,
    gender: "",
    marrital_status: "",
    address: "",
    license_number: "",
    education: "",
    specialization: "",
}

export function doctorMapper(res:Record<string,any>) {    
    let doctor = defaultDoctor;

    if (res == null) {
        return doctor;
    }

    doctor = { 
        id: res.id, 
        name: res.name, 
        birthday: res.birthday,
        gender: res.doctor,
        marrital_status: res.marrital_status,
        address: res.address,
        license_number: res.license_number,
        education: res.education,
        specialization: res.specialization,
    }
    return doctor;
}

export type DoctorNoID = Omit<Doctor, 'id'> & { doctor_organizations: object, user: string };
export function doctorNoIDMapper(doctor:Doctor, orgID:number, userID:string) {

    let doctorNoID: DoctorNoID = { 
        name: doctor.name, 
        birthday: doctor.birthday,
        gender: doctor.gender,
        marrital_status: doctor.marrital_status,
        address: doctor.address,
        specialization: doctor.specialization,
        education: doctor.education, 
        license_number: doctor.license_number,
        doctor_organizations: [{ organizations_id: orgID }],
        user: userID,
    }
    return doctorNoID;
}

export interface DoctorOrganization {
    id: number,
    doctor: Doctor,
    organization: Organization,
    status: string,
    examination_fee: number,
    queue: number,
}

export const defaultDoctorOrganization:DoctorOrganization = {
    id: 0,
    doctor: defaultDoctor,
    organization: defaultOrganization,
    status: "",
    examination_fee: 0,
    queue: 0,
}

export function doctorOrgMapper(res:Record<string,any>) {  
    let doctorOrg = defaultDoctorOrganization;
    if (res == null) {
        return doctorOrg;
    }

    doctorOrg = {
        id: res.id, 
        doctor: doctorMapper(res.doctors_id),
        organization:res.organizations_id? organizationMapper(res.organizations_id):defaultOrganization,
        status: res.status? res.status : DOCTOR_STATUS.absent, 
        examination_fee: res.examination_fee? parseFloat(res.examination_fee) : 0.0,
        queue: res.queue? parseInt(res.queue) : 0,
    }
    return doctorOrg;
}

export type DoctorPatcher = Omit<Doctor, 'id'>;
export function doctorPatcherMapper(doctor:Doctor) {

    let doctorPatcher: DoctorPatcher = { 
        name: doctor.name, 
        birthday: doctor.birthday,
        gender: doctor.gender,
        marrital_status: doctor.marrital_status,
        address: doctor.address,
        specialization: doctor.specialization,
        education: doctor.education, 
        license_number: doctor.license_number,
    }
    return doctorPatcher;
}