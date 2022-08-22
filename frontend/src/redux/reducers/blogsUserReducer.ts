import { BlogsUserInt, GetBlogsUserTypeInt, GET_BLOGS_BY_USER_ID } from "../types/blogTypes";

const blogsUserReducer = (state: BlogsUserInt[] = [], action: GetBlogsUserTypeInt): BlogsUserInt[] => {
 switch (action.type) {
  case GET_BLOGS_BY_USER_ID:
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

export default blogsUserReducer;