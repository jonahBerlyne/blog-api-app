import { Dispatch } from "redux";
import { patchAPI } from "../../utils/FetchData";
import { checkImg, uploadImg } from "../../utils/UploadImg";
import { ALERT, AlertTypeInt } from "../types/alertTypes";
import { AUTH, AuthInt, AuthTypeInt } from "../types/authTypes";

export const updateUser = (avatar: File, name: string, auth: AuthInt) => async (dispatch: Dispatch<AlertTypeInt | AuthTypeInt>) => {
 if (!auth.access_token || !auth.user) return;

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
  }, auth.access_token);

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