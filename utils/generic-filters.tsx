import moment from "moment";

export function monthFilter(month:number):object {
    return { "month(date_updated)": { _eq: month } }
}

export function yearFilter(year:number):object {
    return { "year(date_updated)": { _eq: year } }
}

export function dateRangeFilter(from:Date, to:Date) {
    let start, end = new Date();
    start = from.setDate(from.getDate()-1);
    end = to.setDate(to.getDate()+1);
    return { "date_updated": { _between: [moment(start).format("YYYY-MM-DD"), moment(end).format("YYYY-MM-DD")]  } }
}