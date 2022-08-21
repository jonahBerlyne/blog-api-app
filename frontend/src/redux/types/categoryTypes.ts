import { CategoryInt } from "../../utils/tsDefs";

export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';

export interface CreateCategoryInt {
 type: typeof CREATE_CATEGORY,
 payload: CategoryInt
}

export interface GetCategoriesInt {
 type: typeof GET_CATEGORIES,
 payload: CategoryInt[]
}

export interface UpdateCategoryInt {
 type: typeof UPDATE_CATEGORY,
 payload: CategoryInt
}

export interface DeleteCategoryInt {
 type: typeof DELETE_CATEGORY,
 payload: string
}

export type CategoryType = CreateCategoryInt | GetCategoriesInt | UpdateCategoryInt | DeleteCategoryInt;