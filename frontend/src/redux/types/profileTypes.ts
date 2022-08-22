import { UserInt } from "../../utils/tsDefs";

export const GET_OTHER_INFO = "GET_OTHER_INFO";

export interface GetOtherInfoTypeInt {
 type: typeof GET_OTHER_INFO;
 payload: UserInt;
}