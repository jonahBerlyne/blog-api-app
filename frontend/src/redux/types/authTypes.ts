import { UserInt } from "../../utils/tsDefs";

export const AUTH = 'AUTH';

export interface AuthInt {
 access_token?: string,
 msg?: string,
 user?: UserInt
}

export interface AuthTypeInt {
 type: typeof AUTH,
 payload: AuthInt
}