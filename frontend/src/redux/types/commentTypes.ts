import { CommentInt } from "../../utils/tsDefs";

export const CREATE_COMMENT = "CREATE_COMMENT";
export const GET_COMMENTS = "GET_COMMENTS";
export const REPLY_COMMENT = "REPLY_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const UPDATE_REPLY = "UPDATE_REPLY";

export interface CommentStateInt {
 data: CommentInt[];
 total: number;
}

export interface CreateCommentTypeInt {
 type: typeof CREATE_COMMENT;
 payload: CommentInt;
}

export interface GetCommentsTypeInt {
 type: typeof GET_COMMENTS;
 payload: CommentStateInt;
}

export interface ReplyCommentTypeInt {
 type: typeof REPLY_COMMENT;
 payload: CommentInt;
}

export interface UpdateTypeInt {
 type: typeof UPDATE_COMMENT | typeof UPDATE_REPLY;
 payload: CommentInt;
}

export type CommentType = CreateCommentTypeInt | GetCommentsTypeInt | ReplyCommentTypeInt | UpdateTypeInt;