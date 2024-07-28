import { ALERT_MESSAGE } from "@/constants/alert";
import { ERROR_CODE } from "./errors.constants";

export function errorMessage(code:string, field:string) {
    switch (code) {
        case ERROR_CODE.not_unique:
            return ALERT_MESSAGE.dataExists(field);
        case ERROR_CODE.forbidden:
            return ALERT_MESSAGE.forbidden;
        default:
            return ALERT_MESSAGE.server_error;
    }
}