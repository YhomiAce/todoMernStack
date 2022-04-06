import * as actionType from "./type";
import { v4 as uuidv4 } from "uuid";

export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  const id = uuidv4();
  console.log(id);
  dispatch({ type: actionType.SET_ALERT, payload: { msg, alertType, id } });
  setTimeout(() => {
    dispatch({ type: actionType.REMOVE_ALERT, payload: id });
  }, timeout);
};
