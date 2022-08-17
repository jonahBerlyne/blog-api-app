import { AUTH, AuthInt, AuthTypeInt } from '../types/authTypes';

export const authReducer = (state: AuthInt = {}, action: AuthTypeInt): AuthInt => {
  switch (action.type) {
    case AUTH:
      return action.payload;
    default:
      return state;
  }
}