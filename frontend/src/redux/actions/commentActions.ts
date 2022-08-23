import { Dispatch } from "redux"
import { getAPI, postAPI } from "../../utils/FetchData"
import { CommentInt } from "../../utils/tsDefs"
import { ALERT, AlertTypeInt } from "../types/alertTypes"
import { CreateCommentTypeInt, CREATE_COMMENT, GetCommentsTypeInt, GET_COMMENTS } from "../types/commentTypes"

export const createComment = (data: CommentInt, token: string) => async (dispatch: Dispatch<AlertTypeInt | CreateCommentTypeInt>) => {
 try {
  const res = await postAPI('comment', data, token);

  dispatch({
   type: CREATE_COMMENT,
   payload: {
    ...res.data, 
    user: data.user
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

export const getComments = (id: string) => async (dispatch: Dispatch<AlertTypeInt | GetCommentsTypeInt>) => {
 try {
  let limit = 8;
  const res = await getAPI(`comments/blog/${id}?limit=${limit}`);

  dispatch({
   type: GET_COMMENTS,
   payload: {
    data: res.data.comments,
    total: res.data.total
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