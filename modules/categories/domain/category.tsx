export interface Category {
    id: string,
    name: string,
    type: string,
}

export const defaultCategory:Category = {
    id: "",
    name: "",
    type: "",
}

export const categoryMapper = (res:Record<string,any>) => {
    let category = defaultCategory;
    category = { 
      id: res.id,
      name: res.name,
      type: res.type,
    }
    return category;
}

export const mapCategories = (res:Record<string,any>) => {
    let categories:Category[] = [];
    res?.map( (category:any) => { categories.push(categoryMapper(category)) });
    return categories;
}

export type CategoryCreator = Omit<Category, 'id'> & { organization: number };
export const categoryCreatorMapper = (category:Category, orgID:number) => {
    let categoryCreator:CategoryCreator = {
        name: category.name,
        organization: orgID,
        type: category.type,
    }
    return categoryCreator;
};