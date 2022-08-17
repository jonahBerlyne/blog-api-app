import { Dispatch } from "redux";
import { AUTH, AuthTypeInt } from "../types/authTypes";
import { postAPI } from "../../utils/FetchData";
import { ALERT, AlertTypeInt } from "../types/alertTypes";
import { UserLoginInt, UserRegisterInt } from "../../utils/tsDefs";
import { validRegister } from "../../utils/Validator";

export const login = (userLogin: UserLoginInt) => async (dispatch: Dispatch<AuthTypeInt | AlertTypeInt>) => {
 try {
  dispatch({
   type: ALERT,
   payload: {
    loading: true
   }
  });
  const res = await postAPI('login', userLogin);
  dispatch({
   type: AUTH,
   payload: {
    token: res.data.access_token,
    user: res.data.user
   }
  });
  dispatch({
   type: ALERT,
   payload: {
    success: res.data.msg
   }
  });
  console.log(res);
 } catch (error: any) {
  dispatch({
   type: ALERT,
   payload: {
    errors: error.response.data.msg
   }
  });
 }
}

export const register = (userRegister: UserRegisterInt) => async (dispatch: Dispatch<AuthTypeInt | AlertTypeInt>) => {
 const check = validRegister(userRegister);

 if (check.errLength > 0) {
  return dispatch({
   type: ALERT,
   payload: {
    errors: check.errMsg
   }
  });
 }

 try {
  dispatch({
   type: ALERT,
   payload: {
    loading: true
   }
  });
  const res = await postAPI('register', userRegister);
  dispatch({
   type: ALERT,
   payload: {
    success: res.data.msg
   }
  });
  console.log(res);
 } catch (error: any) {
  dispatch({
   type: ALERT,
   payload: {
    errors: error.response.data.msg
   }
  });
 }
}