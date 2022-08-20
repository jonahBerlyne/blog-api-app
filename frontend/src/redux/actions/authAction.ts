import { Dispatch } from "redux";
import { AUTH, AuthTypeInt } from "../types/authTypes";
import { postAPI, getAPI } from "../../utils/FetchData";
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
   payload: res.data
  });
  dispatch({
   type: ALERT,
   payload: {
    success: res.data.msg
   }
  });
  localStorage.setItem('logged', 'true');
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

export const refreshToken = () => async (dispatch: Dispatch<AuthTypeInt | AlertTypeInt>) => {
 const logged = localStorage.getItem('logged');
 if (logged !== 'true') return;

 try {
  dispatch({
   type: ALERT,
   payload: {
    loading: true
   }
  });
  const res = await getAPI('refresh_token');
  dispatch({
   type: AUTH,
   payload: res.data
  });
  dispatch({
   type: ALERT,
   payload: {}
  });
 } catch (error: any) {
  dispatch({
   type: ALERT,
   payload: {
    errors: error.response.data.msg
   }
  });
 }
}

export const logout = () => async (dispatch: Dispatch<AuthTypeInt | AlertTypeInt>) => {
 try {
  localStorage.removeItem('logged');
  await getAPI('logout');
  window.location.href = '/';
 } catch (error: any) {
  dispatch({
   type: ALERT,
   payload: {
    errors: error.response.data.msg
   }
  });
 }
}

export const googleLogin = (id_token: string) => async (dispatch: Dispatch<AuthTypeInt | AlertTypeInt>) => {
 try {
  dispatch({
   type: ALERT,
   payload: {
    loading: true
   }
  });
  const res = await postAPI('google_login', { id_token });
  
  dispatch({
   type: AUTH,
   payload: res.data
  });

  dispatch({
   type: ALERT,
   payload: {
    success: res.data.msg
   }
  });

  localStorage.setItem('logged', 'true');
 } catch (error: any) {
  dispatch({
   type: ALERT,
   payload: {
    errors: error.response.data.msg
   }
  });
 }
}