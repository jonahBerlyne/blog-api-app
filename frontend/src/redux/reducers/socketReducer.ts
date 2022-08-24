import { SOCKET, SocketTypeInt } from '../types/socketTypes';

const socketReducer = (state: any = null, action: SocketTypeInt) => {
 switch (action.type) {
  case SOCKET:
   return action.payload;
  default:
   return state;
 }
}

export default socketReducer;