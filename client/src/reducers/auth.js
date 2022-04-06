import * as actionTypes from "../actions/type";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

const AuthReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case actionTypes.LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case actionTypes.REGISTER_FAIL:
    case actionTypes.LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        loading: false,
        isAuthenticated: false,
      };
    case actionTypes.USER_LOADED:
      return {
        ...state,
        loading: false,
        user: payload,
        isAuthenticated: true,
      };
    case actionTypes.AUTH_ERROR:
    case actionTypes.LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        token: null,
      };
    default:
      return state;
  }
};

export default AuthReducer;
