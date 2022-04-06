import * as actionType from "../actions/type";
const initialState = [];

const AlertReducer = (state = initialState, action) => {
    const {type, payload} = action;
  switch (type) {
    case actionType.SET_ALERT:
      return [...state, payload];
    case actionType.REMOVE_ALERT:
        return state.filter(alert=> alert.id !== payload);
    default:
      return state;
  }
};

export default AlertReducer;
