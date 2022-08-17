import { UserInt } from "../../utils/tsDefs";

export const AUTH = 'AUTH';

export interface AuthInt {
 token?: string,
 user?: UserInt
}

export interface AuthTypeInt {
 type: typeof AUTH,
 payload: AuthInt
}