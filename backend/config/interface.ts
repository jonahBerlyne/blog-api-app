import { Document } from "mongoose";
import { Request } from "express";

export interface UserInt extends Document {
 name: string;
 account: string;
 password: string;
 avatar: string;
 role: string;
 type: string;
 rf_token?: string;
 _doc: object;
}

export interface NewUserInt {
 name: string;
 account: string;
 password: string;
}

export interface DecodedTokenInt {
 id?: string;
 newUser?: NewUserInt;
 iat: number;
 exp: number;
}

export interface GooglePayloadInt {
 email: string;
 email_verified: boolean;
 name: string;
 picture: string;
}

export interface UserParamsInt {
 name: string;
 account: string;
 password: string;
 avatar?: string;
 type: string;
}

export interface ReqAuthInt extends Request {
 user?: UserInt;
}

export interface CommentInt extends Document {
 user: string;
 blog_id: string;
 blog_user_id: string;
 content: string;
 reply_comment: string[];
 reply_user: string;
 comment_root: string;
 _doc: object;
}

export interface BlogInt extends Document {
 user: string;
 title: string;
 content: string;
 description: string;
 thumbnail: string;
 category: string;
 _doc: object;
}