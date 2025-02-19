import appConfig from "@/config";

export const randomHexColorGenerator = () => {
    return '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
}

export const currency = (val:number) => {
    const currFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: appConfig.CURRENCY_FORMAT });
    return currFormat.format(val);
}

export const isEmptyObject = (obj:object) => {
    return Object.keys(obj).length === 0;
}


export const dateFormatOpts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'numeric', year: 'numeric' };