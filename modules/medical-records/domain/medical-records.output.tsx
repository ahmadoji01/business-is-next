import { Patient } from "@/modules/patients/domain/patient"

export interface PatientsOutput {
	getPatients(): Promise<Patient[]>
	addPatient({ patientId }: { patientId: string }): Promise<Patient[]>
	updatePatient({ patientId }: { patientId: string }): Promise<Patient[]>
	removePatient({ patientId }: { patientId: string }): Promise<Patient[]>
}