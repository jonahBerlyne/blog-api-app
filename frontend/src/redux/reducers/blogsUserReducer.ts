import { UserInt } from "../../utils/tsDefs";
import { BlogsUserInt, BlogUserType, CREATE_BLOGS_BY_USER_ID, DELETE_BLOGS_BY_USER_ID, GetBlogsUserTypeInt, GET_BLOGS_BY_USER_ID } from "../types/blogTypes";

const blogsUserReducer = (state: BlogsUserInt[] = [], action: BlogUserType): BlogsUserInt[] => {
 switch (action.type) {
  case GET_BLOGS_BY_USER_ID:
   if (state.every(item => item.id !== action.payload.id)) {
     return [...state, action.payload];
   } else {
    return state.map(item => (
      item.id === action.payload.id ?
      action.payload :
      item
    ));
   }
  case CREATE_BLOGS_BY_USER_ID:
    return state.map(item => (
      item.id === (action.payload.user as UserInt)._id ?
      {
        ...item,
        blogs: [action.payload, ...item.blogs]
      } :
      item
    ));
  case DELETE_BLOGS_BY_USER_ID:
    return state.map(item => (
      item.id === (action.payload.user as UserInt)._id ?
      {
        ...item,
        blogs: item.blogs.filter(blog => (
          blog._id !== action.payload._id
        ))
      } :
      item
    ));
  default:
   return state;
 }
}

export default blogsUserReducer;