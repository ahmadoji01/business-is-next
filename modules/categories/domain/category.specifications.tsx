import { Item } from "@/modules/items/domain/item"
import { MAIN_CATEGORY } from "./category.constants"
import { ITEM_TYPE } from "@/modules/items/domain/item.constants"

export function nameEquals(name:string) {
    return  { "name": { _eq: name } } 
}

export function parentNameEquals(name:string) {
    return { "category": 
        { "parent": 
            { "name": { _eq: name }  }
        }
    }
}

export function superNameEquals(name:string) {
    return { "super_parent": { "name": { _eq: name }  } }
}

export const medicineCategoriesFilter = {
    _or: [
        {
            "type": { _eq: ITEM_TYPE.medicine }
        },
        {
            "name": { _eq: "Medicines" } 
        }
    ]
}

export const treatmentCategoriesFilter = {
    _or: [
        {
            "type": { _eq: ITEM_TYPE.treatment }
        },
        {
            "name": { _eq: "Treatments" } 
        }
    ]
}

export const isTreatment = (item:Item) => {
    if (item.category?.super_parent?.name !== MAIN_CATEGORY.treatments || item.category?.name !== MAIN_CATEGORY.treatments)  {
        return false;
    }
    return true;
}

export const isMedicine = (item:Item) => {
    if (item.category?.super_parent?.name !== MAIN_CATEGORY.medicines || item.category?.name !== MAIN_CATEGORY.medicines)  {
        return false;
    }
    return true;
}