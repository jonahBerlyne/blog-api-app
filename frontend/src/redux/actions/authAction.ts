import { Dispatch } from "redux";
import { AUTH, AuthTypeInt } from "../types/authTypes";
import { postAPI, getAPI } from "../../utils/FetchData";
import { ALERT, AlertTypeInt } from "../types/alertTypes";
import { UserLoginInt, UserRegisterInt } from "../../utils/tsDefs";
import { validRegister, validPhone } from "../../utils/Validator";
import { checkTokenExp } from "../../utils/checkTokenExp";

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

export const logout = (token: string) => async (dispatch: Dispatch<AuthTypeInt | AlertTypeInt>) => {
 const result = await checkTokenExp(token, dispatch);
 const access_token = result ? result : token;
 
 try {
  localStorage.removeItem('logged');
  dispatch({
    type: AUTH,
    payload: {}
  });
  await getAPI('logout', access_token);
 } catch (error: any) {
  dispatch({
   type: ALERT,
   payload: {
    errors: error.response.data.msg
   }
  });
 }
}

export const loginSMS = (phone: string) => async (dispatch: Dispatch<AuthTypeInt | AlertTypeInt>) => {
 const check = validPhone(phone);
 if (!check) {
  return dispatch({
   type: ALERT,
   payload: { errors: 'Phone number format is incorrect' }
  });
 }

 try {
  dispatch({
   type: ALERT,
   payload: {
    loading: true
   }
  });
  
  const res = await postAPI('login_sms', { phone });

  if (!res.data.valid) {
   verifySMS(phone, dispatch);
  }

 } catch (error: any) {
  dispatch({
   type: ALERT,
   payload: {
    errors: error.response.data.msg
   }
  });
 }
}

export const verifySMS = async (phone: string, dispatch: Dispatch<AuthTypeInt | AlertTypeInt>) => {
  const code = prompt('Enter your SMS code');
  if (!code) return;

  try {
   dispatch({
    type: ALERT,
    payload: {
     loading: true
    }
   });
   
   const res = await postAPI('verify_sms', { phone, code });
   
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
   setTimeout(() => {
    verifySMS(phone, dispatch);
   }, 100);
  }

}

export const forgotPassword = (account: string) => async (dispatch: Dispatch<AuthTypeInt | AlertTypeInt>) => {

 try {
  dispatch({
   type: ALERT,
   payload: {
    loading: true
   }
  });

  const res = await postAPI('forgot_password', { account });

  dispatch({
   type: ALERT,
   payload: {
    success: res.data.msg
   }
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