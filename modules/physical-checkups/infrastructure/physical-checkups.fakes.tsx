import { defaultHeadToToeCheckup } from "../domain/head-to-toe-checkup"
import { PhysicalCheckup } from "../domain/physical-checkup"

export const physicalCheckupsFakeData:PhysicalCheckup[] = [
    {
        id: 1,
        height: 170,
        weight: 68,
        tension: "120mmHg",
        temperature: 38,
        breathRate: 120,
        heartRate: 120,
        pastMedicalConcern: 
        {
            pastIllnesses: "COVID-19, Tuberculosis",
            hospitalizations: [ 
                {
                    date: new Date("12-01-2020"),
                    reason: "COVID-19"
                } 
            ],
            surgeries: [ {
                date: new Date("01-01-2020"),
                surgeryType: "Kidney",
            } ],
            allergies: [ {
                type: "Lactose",
                reaction: "Bowel Syndrome",
            } ],
            medications: [ {
                medicine: "Paracetamol",
                dose: "1 per day",
                occurence: "Rare",
            } ],
            lifestyle: [ {
                name: "Smoking",
                occurence: "Often",
            } ],
        },
        headToToeCheckup: defaultHeadToToeCheckup,
    }
]