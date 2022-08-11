import { Document } from "mongoose";

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