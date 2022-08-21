import { Dispatch } from "redux";
import { checkImg, uploadImg } from "../../utils/UploadImg";
import { ALERT, AlertTypeInt } from "../types/alertTypes";
import { AuthInt } from "../types/authTypes";

export const updateUser = (avatar: File, name: string, auth: AuthInt) => async (dispatch: Dispatch<AlertTypeInt>) => {
 if (!auth.access_token || !auth.user) return;

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

   await uploadImg(avatar);
  }

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