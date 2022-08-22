import { BlogsCategoryInt, GetBlogsCategoryTypeInt, GET_BLOGS_BY_CATEGORY_ID } from "../types/blogTypes";

const blogsCategoryReducer = (state: BlogsCategoryInt[] = [], action: GetBlogsCategoryTypeInt): BlogsCategoryInt[] => {
 switch (action.type) {
  case GET_BLOGS_BY_CATEGORY_ID:
   if (state.every(item => item.id !== action.payload.id)) {
     return [...state, action.payload];
   } else {
    return state.map(blog => (
      blog.id === action.payload.id ?
      action.payload :
      blog
    ));
   }
  default:
   return state;
 }
}

export default blogsCategoryReducer;