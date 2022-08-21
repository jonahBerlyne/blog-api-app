import { Document } from "mongoose";
import { Request } from "express";

export interface UserInt extends Document {
 name: string;
 account: string;
 password: string;
 avatar: string;
 role: string;
 type: string;
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