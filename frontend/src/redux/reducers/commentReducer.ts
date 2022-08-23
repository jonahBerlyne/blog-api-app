import { CommentStateInt, CommentType, CREATE_COMMENT, GET_COMMENTS } from "../types/commentTypes";

const initialState = {
 data: [],
 total: 1
};

const commentReducer = (state: CommentStateInt = initialState, action: CommentType): CommentStateInt => {
 switch (action.type) {
  case CREATE_COMMENT:
   return {
    ...state,
    data: [action.payload, ...state.data]
   }
  case GET_COMMENTS:
    return action.payload;
  default:
   return state;
 }
}

export default commentReducer;