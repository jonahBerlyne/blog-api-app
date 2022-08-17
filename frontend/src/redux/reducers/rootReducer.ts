import { combineReducers } from "redux";
import { alertReducer } from "./alertReducer";
import { authReducer } from "./authReducer";

export const rootReducer = combineReducers({
 alert: alertReducer,
 auth: authReducer
});