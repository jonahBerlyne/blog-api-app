import { Dispatch } from "redux";
import { checkTokenExp } from "../../utils/checkTokenExp";
import { getAPI, patchAPI } from "../../utils/FetchData";
import { checkImg, uploadImg } from "../../utils/imgValidators";
import { checkPassword } from "../../utils/Validator";
import { ALERT, AlertTypeInt } from "../types/alertTypes";
import { AUTH, AuthInt, AuthTypeInt } from "../types/authTypes";
import { GetOtherInfoTypeInt, GET_OTHER_INFO } from "../types/profileTypes";

export const updateUser = (avatar: File, name: string, auth: AuthInt) => async (dispatch: Dispatch<AlertTypeInt | AuthTypeInt>) => {
 if (!auth.access_token || !auth.user) return;

 const result = await checkTokenExp(auth.access_token, dispatch);
 const access_token = result ? result : auth.access_token;

 let url = '';

 try {
  dispatch({
   type: ALERT,
   payload: {
    loading: true
   }
  });

  if (avatar) {
   const check = checkImg(avatar);
   if (check) {
    return dispatch({
            type: ALERT,
            payload: {
             errors: check
            }
           });
   }

   const photo = await uploadImg(avatar);
   url = photo.url;
  }

  dispatch({
   type: AUTH,
   payload: {
     access_token: auth.access_token,
     user: {
       ...auth.user,
       avatar: url ? url : auth.user.avatar, 
       name: url ? url : auth.user.avatar 
     }
   }
  });

  const res = await patchAPI('user', { 
    avatar: url ? url : auth.user.avatar, 
    name: url ? url : auth.user.avatar 
  }, access_token);

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

export const resetPassword = (password: string, confirmPassword: string, token: string) => async (dispatch: Dispatch<AlertTypeInt | AuthTypeInt>) => {
 const result = await checkTokenExp(token, dispatch);
 const access_token = result ? result : token;

 const msg = checkPassword(password, confirmPassword);

 if (msg) return dispatch({
  type: ALERT,
  payload: {
   errors: msg
  }
 });
 
 try {
  dispatch({
   type: ALERT,
   payload: {
    loading: true
   }
  });

  const res = await patchAPI('reset_password', { password }, access_token);

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

export const getOtherInfo = (id: string) => async (dispatch: Dispatch<AlertTypeInt | GetOtherInfoTypeInt>) => {
  try {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    });

    const res = await getAPI(`user/${id}`);

    dispatch({
      type: GET_OTHER_INFO,
      payload: res.data
    });

    dispatch({
      type: ALERT,
      payload: {
        loading: false
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