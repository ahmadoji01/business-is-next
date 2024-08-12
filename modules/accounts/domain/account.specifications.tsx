export function accountsByCodes(codes:string[]) {
    let codesFilter:object[] = [];

    codes.map( code => {
        let filter = { code: { _eq: code } };
        codesFilter.push(filter);
    });
    
    return { 
        _or: codesFilter
    }
}