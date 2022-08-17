import { Dispatch } from "redux";
import { AUTH, AuthTypeInt } from "../types/authTypes";
import { postAPI } from "../../utils/FetchData";
import { ALERT, AlertTypeInt } from "../types/alertTypes";

export const login = (userLogin: any) => async (dispatch: Dispatch<AuthTypeInt | AlertTypeInt>) => {
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
    success: "Login successful"
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