export interface PastMedicalConcern {
    pastIllnesses: string,
    hospitalizations: [ {
        date: Date,
        reason: string,
    } ],
    surgeries: [ {
        date: Date,
        surgeryType: string,
    } ],
    allergies: [ {
        type: string,
        reaction: string,
    } ],
    medications: [ {
        medicine: string,
        dose: string,
        occurence: string,
    } ],
    lifestyle: [ {
        name: string,
        occurence: string,
    } ],
}

export const defaultPastMedicalConcern: PastMedicalConcern = {
    pastIllnesses: "",
    hospitalizations: [ {
        date: new Date,
        reason: "",
    } ],
    surgeries: [ {
        date: new Date,
        surgeryType: "",
    } ],
    allergies: [ {
        type: "",
        reaction: "",
    } ],
    medications: [ {
        medicine: "",
        dose: "",
        occurence: "",
    } ],
    lifestyle: [ {
        name: "",
        occurence: "",
    } ],
}