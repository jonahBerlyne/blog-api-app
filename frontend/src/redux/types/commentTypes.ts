import { CommentInt } from "../../utils/tsDefs";

export const CREATE_COMMENT = "CREATE_COMMENT";

export interface CommentStateInt {
 data: CommentInt[];
 total: number;
}

export interface CreateCommentTypeInt {
 type: typeof CREATE_COMMENT;
 payload: CommentInt;
}

export type CommentType = CreateCommentTypeInt;