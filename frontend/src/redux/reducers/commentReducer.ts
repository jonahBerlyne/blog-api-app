import { CommentStateInt, CommentType, CREATE_COMMENT, GET_COMMENTS, REPLY_COMMENT } from "../types/commentTypes";

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
  case REPLY_COMMENT:
    return {
      ...state,
      data: state.data.map(item => (
        item._id === action.payload.comment_root ?
        {
          ...item,
          reply_comment: [
            action.payload,
            ...item.reply_comment as []
          ]
        } : item
      ))
    }
  default:
   return state;
 }
}

export default commentReducer;