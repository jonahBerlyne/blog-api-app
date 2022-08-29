import { Dispatch } from "redux";
import { deleteAPI, getAPI, patchAPI, postAPI } from "../../utils/FetchData";
import { CategoryInt } from "../../utils/tsDefs";
import { ALERT, AlertTypeInt } from "../types/alertTypes";
import { CategoryType, CREATE_CATEGORY, DELETE_CATEGORY, GET_CATEGORIES, UPDATE_CATEGORY } from "../types/categoryTypes";

import { checkTokenExp } from '../../utils/checkTokenExp';

export const createCategory = (name: string, token: string) => async (dispatch: Dispatch<AlertTypeInt | CategoryType>) => {
 const result = await checkTokenExp(token, dispatch);
 const access_token = result ? result : token;

 try {
  dispatch({
   type: ALERT,
   payload: {
    loading: true
   }
  });

  const res = await postAPI('category', { name }, access_token);

  dispatch({
   type: CREATE_CATEGORY,
   payload: res.data.newCategory
  });

  dispatch({
   type: ALERT,
   payload: {
    loading: false
   }
  });
 } catch (error: any) {
  dispatch({
   type: ALERT,
   payload: {
    errors: error.response.data.msg
   }
  });
 }
}

export const getCategories = () => async (dispatch: Dispatch<AlertTypeInt | CategoryType>) => {
 try {
  dispatch({
   type: ALERT,
   payload: {
    loading: true
   }
  });

  const res = await getAPI('category');

  dispatch({
   type: GET_CATEGORIES,
   payload: res.data.categories
  });

  dispatch({
   type: ALERT,
   payload: {
    loading: false
   }
  });
 } catch (error: any) {
  dispatch({
   type: ALERT,
   payload: {
    errors: error.response.data.msg
   }
  });
 }
}

export const updateCategory = (data: CategoryInt, token: string) => async (dispatch: Dispatch<AlertTypeInt | CategoryType>) => {
 const result = await checkTokenExp(token, dispatch);
 const access_token = result ? result : token;

 try {
  dispatch({
   type: UPDATE_CATEGORY,
   payload: data
  });

  await patchAPI(`category/${data._id}`, { name: data.name }, access_token);

 } catch (error: any) {
  dispatch({
   type: ALERT,
   payload: {
    errors: error.response.data.msg
   }
  });
 }
}

export const deleteCategory = (id: string, token: string) => async (dispatch: Dispatch<AlertTypeInt | CategoryType>) => {
 const result = await checkTokenExp(token, dispatch);
 const access_token = result ? result : token;

 try {
  dispatch({
   type: DELETE_CATEGORY,
   payload: id
  });

  await deleteAPI(`category/${id}`, access_token);

 } catch (error: any) {
  dispatch({
   type: ALERT,
   payload: {
    errors: error.response.data.msg
   }
  });
 }
}