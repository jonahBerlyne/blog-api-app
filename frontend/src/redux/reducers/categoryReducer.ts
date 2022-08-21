import { CREATE_CATEGORY, CategoryType, GET_CATEGORIES } from "../types/categoryTypes";
import { CategoryInt } from "../../utils/tsDefs";

const categoryReducer = (state: CategoryInt[] = [], action: CategoryType): CategoryInt[] => {
 switch (action.type) {
  case CREATE_CATEGORY:
   return [action.payload, ...state];
  case GET_CATEGORIES:
   return action.payload;
  default:
   return state;
 }
}

export default categoryReducer;