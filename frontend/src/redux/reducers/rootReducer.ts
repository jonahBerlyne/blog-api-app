import { combineReducers } from "redux";
import { alertReducer } from "./alertReducer";
import { authReducer } from "./authReducer";
import categoryReducer from "./categoryReducer";

export const rootReducer = combineReducers({
 alert: alertReducer,
 auth: authReducer,
 categories: categoryReducer
});