import { ALERT, AlertTypeInt } from '../types/alertTypes';
import { AlertInt } from '../../utils/tsDefs';

export const alertReducer = (state: AlertInt = {}, action: AlertTypeInt): AlertInt => {
  switch (action.type) {
    case ALERT:
      return action.payload;
    default:
      return state;
  }
}