export interface Account {
    id: string,
    code: string,
    name: string,
}

export const defaultAccount = {
    id: "",
    code: "",
    name: "",
}

export function accountMapper(res:Record<string,any>) {
    let account = {
        id: res.id,
        code: res.code,
        name: res.name,
    }
    return account;
}

export function mapAccounts(res:Record<string,any>) {
    let accounts:Account[] = [];
    res?.map( (code:any) => {
        accounts.push(accountMapper(code));
    });
    return accounts;
}