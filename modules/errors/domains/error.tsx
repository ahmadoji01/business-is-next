export interface Error {
    message: string,
    code: string,
    field: string,
}

export const defaultError = {
    message: "",
    code: "",
    field: "",
}

export function errorMapper(res:Record<string,any>) {
    let error:Error = {
        message: res.message? res.message:"",
        code: res.extensions.code,
        field: res.extensions.field? res.extensions.field : "",
    }
    return error;
}