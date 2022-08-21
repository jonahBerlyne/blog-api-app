import { CategoryInt } from "../../utils/tsDefs";

export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const GET_CATEGORIES = 'GET_CATEGORIES';

export interface CreateCategoryInt {
 type: typeof CREATE_CATEGORY,
 payload: CategoryInt
}

export interface GetCategoriesInt {
 type: typeof GET_CATEGORIES,
 payload: CategoryInt[]
}

export type CategoryType = CreateCategoryInt | GetCategoriesInt;