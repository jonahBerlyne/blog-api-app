import { Dispatch } from "redux"
import { checkTokenExp } from "../../utils/checkTokenExp"
import { deleteAPI, getAPI, patchAPI, postAPI } from "../../utils/FetchData"
import { CommentInt } from "../../utils/tsDefs"
import { ALERT, AlertTypeInt } from "../types/alertTypes"
import { CreateCommentTypeInt, CREATE_COMMENT, DeleteTypeInt, DELETE_COMMENT, DELETE_REPLY, GetCommentsTypeInt, GET_COMMENTS, ReplyCommentTypeInt, REPLY_COMMENT, UpdateTypeInt, UPDATE_COMMENT, UPDATE_REPLY } from "../types/commentTypes"

export const createComment = (data: CommentInt, token: string) => async (dispatch: Dispatch<AlertTypeInt | CreateCommentTypeInt>) => {
 const result = await checkTokenExp(token, dispatch);
 const access_token = result ? result : token;

 try {
  await postAPI('comment', data, access_token);
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
 const result = await checkTokenExp(token, dispatch);
 const access_token = result ? result : token;

 try {
  await postAPI('reply_comment', data, access_token);
 } catch (error: any) {
  dispatch({
   type: ALERT,
   payload: {
    errors: error.response.data.msg
   }
  });
 }
}

export const updateComment = (data: CommentInt, token: string) => async (dispatch: Dispatch<AlertTypeInt | UpdateTypeInt>) => {
 const result = await checkTokenExp(token, dispatch);
 const access_token = result ? result : token;

 try {
  dispatch({
   type: data.comment_root ? UPDATE_REPLY : UPDATE_COMMENT,
   payload: data
  });

  await patchAPI(`comment/${data._id}`, { data }, access_token);

 } catch (error: any) {
  dispatch({
   type: ALERT,
   payload: {
    errors: error.response.data.msg
   }
  });
 }
}

export const deleteComment = (data: CommentInt, token: string) => async (dispatch: Dispatch<AlertTypeInt | DeleteTypeInt>) => {
 const result = await checkTokenExp(token, dispatch);
 const access_token = result ? result : token;

 try {
  dispatch({
   type: data.comment_root ? DELETE_REPLY : DELETE_COMMENT,
   payload: data
  });

  await deleteAPI(`comment/${data._id}`, access_token);

 } catch (error: any) {
  dispatch({
   type: ALERT,
   payload: {
    errors: error.response.data.msg
   }
  });
 }
}