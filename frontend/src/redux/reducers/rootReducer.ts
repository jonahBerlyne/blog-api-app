import { combineReducers } from "redux";
import { alertReducer } from "./alertReducer";
import { authReducer } from "./authReducer";
import categoryReducer from "./categoryReducer";
import homeBlogsReducer from "./homeBlogsReducer";

export const rootReducer = combineReducers({
 alert: alertReducer,
 auth: authReducer,
 categories: categoryReducer,
 homeBlogs: homeBlogsReducer
});