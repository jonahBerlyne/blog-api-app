import { Dispatch } from "redux"
import { getAPI, postAPI } from "../../utils/FetchData"
import { CommentInt } from "../../utils/tsDefs"
import { ALERT, AlertTypeInt } from "../types/alertTypes"
import { CreateCommentTypeInt, CREATE_COMMENT, GetCommentsTypeInt, GET_COMMENTS, ReplyCommentTypeInt, REPLY_COMMENT } from "../types/commentTypes"

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

export const getComments = (id: string, num: number) => async (dispatch: Dispatch<AlertTypeInt | GetCommentsTypeInt>) => {
 try {
  let limit = 4;
  const res = await getAPI(`comments/blog/${id}?page=${num}&limit=${limit}`);

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

export const replyComment = (data: CommentInt, token: string) => async (dispatch: Dispatch<AlertTypeInt | ReplyCommentTypeInt>) => {
 try {
  const res = await postAPI('reply_comment', data, token);

  dispatch({
   type: REPLY_COMMENT,
   payload: {
    ...res.data, 
    user: data.user,
    reply_user: data.reply_user
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