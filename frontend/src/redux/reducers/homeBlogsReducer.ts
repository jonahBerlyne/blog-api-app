import { GET_HOME_BLOGS, GetHomeBlogsTypeInt, HomeBlogsInt } from "../types/blogTypes";

const homeBlogsReducer = (state: HomeBlogsInt[] = [], action: GetHomeBlogsTypeInt): HomeBlogsInt[] => {
 switch (action.type) {
  case GET_HOME_BLOGS:
   return action.payload;
  default:
   return state;
 }
}

export default homeBlogsReducer;