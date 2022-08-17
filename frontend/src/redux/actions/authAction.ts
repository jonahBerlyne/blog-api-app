import { Dispatch } from "redux";
import { AUTH, AuthTypeInt } from "../types/authTypes";
import { postAPI } from "../../utils/FetchData";

export const login = (userLogin: any) => async (dispatch: Dispatch<AuthTypeInt>) => {
 try {
  const res = await postAPI('login', userLogin);
  dispatch({
   type: AUTH,
   payload: {
    token: res.data.access_token,
    user: res.data.user
   }
  });
  console.log(res);
 } catch (error: any) {
  console.log(error.response.data.msg);
 }
}