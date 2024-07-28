import moment from "moment";

export function monthFilter(month:number):object {
    return { "month(date_updated)": { _eq: month } }
}

export function yearFilter(year:number):object {
    return { "year(date_updated)": { _eq: year } }
}

export function dateRangeFilter(from:Date, to:Date) {
    return { "date_updated": { _between: [moment(from).format("YYYY-MM-DD"), moment(to).format("YYYY-MM-DD")]  } }
}