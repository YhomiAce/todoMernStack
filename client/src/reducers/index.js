import { combineReducers } from "redux";
import AlertReducer from "./alert";
import AuthReducer from "./auth";
import TodoReducer from "./todo";

// export default combineReducers({
//     alert
// });
const rootReducer = combineReducers({
  alert: AlertReducer,
  auth: AuthReducer,
  todo: TodoReducer
});

export default rootReducer;
