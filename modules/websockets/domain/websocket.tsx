export interface SubsOutput {
    event:string,
    data:any
}

export function subsOutputMapper(res:Record<string,any>) {
    let subsOutput = {
        event: res.event,
        data: res.data
    }
    return subsOutput;
}