import { EDUCATION } from "@/modules/patients/domain/patient.constants";
import { useTranslations } from "next-intl";

export function educationDisplay(education:string) {
    
    const t = useTranslations();

    switch (education) {
        case EDUCATION.uneducated:
            return t('education_levels.uneducated');
        case EDUCATION.elementary:
            return t('education_levels.elementary');
        case EDUCATION.junior_secondary:
            return t('education_levels.junior_secondary');
        case EDUCATION.senior_secondary:
            return t('education_levels.senior_secondary');
        case EDUCATION.associate:
            return t('education_levels.associate');
        case EDUCATION.bachelor:
            return t('education_levels.bachelor');
        case EDUCATION.master:
            return t('education_levels.master');
        case EDUCATION.doctorate:
            return t('education_levels.doctorate');
        case EDUCATION.postdoctorate:
            return t('education_levels.postdoctorate');
        default:
            return "";
    }
}