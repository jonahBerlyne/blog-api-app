import { UserInt } from "../../utils/tsDefs";
import { GetOtherInfoTypeInt, GET_OTHER_INFO } from "../types/profileTypes";

const otherInfoReducer = (state: UserInt[] = [], action: GetOtherInfoTypeInt): UserInt[] => { 
 switch (action.type) {
  case GET_OTHER_INFO:
   return [...state, action.payload];
  default:
   return state;
 }
}

export default otherInfoReducer;