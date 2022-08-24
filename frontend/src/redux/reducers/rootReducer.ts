import { combineReducers } from "redux";
import { alertReducer } from "./alertReducer";
import { authReducer } from "./authReducer";
import blogsCategoryReducer from "./blogsCategoryReducer";
import blogsUserReducer from "./blogsUserReducer";
import categoryReducer from "./categoryReducer";
import commentReducer from "./commentReducer";
import homeBlogsReducer from "./homeBlogsReducer";
import otherInfoReducer from "./otherInfoReducer";
import socketReducer from "./socketReducer";

export const rootReducer = combineReducers({
 alert: alertReducer,
 auth: authReducer,
 blogsCategory: blogsCategoryReducer,
 blogsUser: blogsUserReducer,
 categories: categoryReducer,
 comments: commentReducer,
 homeBlogs: homeBlogsReducer,
 otherInfo: otherInfoReducer,
 socket: socketReducer
});