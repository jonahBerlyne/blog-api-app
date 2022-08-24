import { Dispatch } from "redux"
import { deleteAPI, getAPI, patchAPI, postAPI } from "../../utils/FetchData"
import { CommentInt } from "../../utils/tsDefs"
import { ALERT, AlertTypeInt } from "../types/alertTypes"
import { CreateCommentTypeInt, CREATE_COMMENT, DeleteTypeInt, DELETE_COMMENT, DELETE_REPLY, GetCommentsTypeInt, GET_COMMENTS, ReplyCommentTypeInt, REPLY_COMMENT, UpdateTypeInt, UPDATE_COMMENT, UPDATE_REPLY } from "../types/commentTypes"

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

export const updateComment = (data: CommentInt, token: string) => async (dispatch: Dispatch<AlertTypeInt | UpdateTypeInt>) => {
 try {
  dispatch({
   type: data.comment_root ? UPDATE_REPLY : UPDATE_COMMENT,
   payload: data
  });

  await patchAPI(`comment/${data._id}`, {
   content: data.content
  }, token);

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
 try {
  dispatch({
   type: data.comment_root ? DELETE_REPLY : DELETE_COMMENT,
   payload: data
  });

  await deleteAPI(`comment/${data._id}`, token);

 } catch (error: any) {
  dispatch({
   type: ALERT,
   payload: {
    errors: error.response.data.msg
   }
  });
 }
}