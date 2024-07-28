export function nameFilter(name:string):object {
    return { name: { _icontains: name } };
}