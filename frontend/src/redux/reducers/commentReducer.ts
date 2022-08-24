import { CommentStateInt, CommentType, CREATE_COMMENT, DELETE_COMMENT, DELETE_REPLY, GET_COMMENTS, REPLY_COMMENT, UPDATE_COMMENT, UPDATE_REPLY } from "../types/commentTypes";

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
  case UPDATE_COMMENT:
    return {
      ...state,
      data: state.data.map(item => (
        item._id === action.payload._id ?
        action.payload :
        item
      ))
    }
  case UPDATE_REPLY:
    return {
      ...state,
      data: state.data.map(item => (
        item._id === action.payload.comment_root ?
        {
          ...item,
          reply_comment: item.reply_comment?.map(reply => (
            reply._id === action.payload._id ?
            action.payload :
            reply 
          ))
        } :
        item
      ))
    }
  case DELETE_COMMENT:
    return {
      ...state,
      data: state.data.filter(item => item._id !== action.payload._id)
    }
  case DELETE_REPLY:
    return {
      ...state,
      data: state.data.map(item => (
        item._id === action.payload.comment_root ?
        {
          ...item,
          reply_comment: item.reply_comment?.filter(reply => (
            reply._id !== action.payload._id
          ))
        } :
        item
      ))
    }
  default:
   return state;
 }
}

export default commentReducer;