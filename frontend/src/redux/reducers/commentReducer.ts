import { CommentStateInt, CommentType, CREATE_COMMENT } from "../types/commentTypes";

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
  default:
   return state;
 }
}

export default commentReducer;