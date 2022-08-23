import { CommentInt } from "../../utils/tsDefs";

export const CREATE_COMMENT = "CREATE_COMMENT";
export const GET_COMMENTS = "GET_COMMENTS";

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

export type CommentType = CreateCommentTypeInt | GetCommentsTypeInt;