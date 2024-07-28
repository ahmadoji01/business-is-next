export function DoctorName(name: string, specialization: string):string {
    return "dr. " + name + " " + specialization;
}

export function doctorIDsInFilter(ids:number[]) {
    return { id: { _in: ids } };
}