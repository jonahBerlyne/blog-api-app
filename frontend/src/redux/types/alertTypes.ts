import { AlertInt } from "../../utils/tsDefs";

export const ALERT = "ALERT";

export interface AlertTypeInt {
 type: typeof ALERT,
 payload: AlertInt
}