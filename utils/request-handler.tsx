import appConfig from "@/config";
import { authentication, createDirectus, realtime, rest, staticToken } from "@directus/sdk";

export const directusClient = createDirectus(appConfig.API_HOST? appConfig.API_HOST : '')
            .with(authentication('cookie', { credentials: 'include', autoRefresh: true }))
            .with(rest({ credentials: 'include' }));

export const websocketClient = (accessToken:string) => { 
    return createDirectus(appConfig.WEBSOCKET_HOST? appConfig.WEBSOCKET_HOST : '')
            .with(staticToken(accessToken))
            .with(realtime());
}

export function imageHandler(id:string, fileName:string) {
    return appConfig.API_HOST + "/assets/" + id + "/" + fileName;
}

export function pagesCount(total:number|string|null, itemPerPage:number) {
    let tot = 0;
    
    if (typeof(total) === "string")
        tot = parseInt(total);

    if (typeof(total) === "number")
        tot = total;

    let pages = Math.floor(tot/itemPerPage) + 1;
    return pages;
}