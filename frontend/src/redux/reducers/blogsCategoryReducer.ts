import { BlogsCategoryInt, GetBlogsCategoryTypeInt, GET_BLOGS_BY_CATEGORY_ID } from "../types/blogTypes";

const blogsCategoryReducer = (state: BlogsCategoryInt[] = [], action: GetBlogsCategoryTypeInt): BlogsCategoryInt[] => {
 switch (action.type) {
  case GET_BLOGS_BY_CATEGORY_ID:
   return [...state, action.payload];
  default:
   return state;
 }
}

export default blogsCategoryReducer;