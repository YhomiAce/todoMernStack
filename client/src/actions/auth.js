import * as actionTypes from "./type";
import axios from "axios";
import Swal from "sweetalert2";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthHeader";


// register user
export const register = (authData, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/users", authData, config);
    dispatch({
      type: actionTypes.REGISTER_SUCCESS,
      payload: res.data,
    });
    Swal.fire({
      title: "Registered",
      icon: "success",
      text: "Registration was Successful",
    }).then(()=>{
      // window.location.href='/login'
      history.push("/login")
    })
    
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }
    dispatch({
      type: actionTypes.REGISTER_FAIL,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    // console.log(res.data.user);
    dispatch({
      type: actionTypes.USER_LOADED,
      payload: res.data.user,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.AUTH_ERROR,
    });
  }
};

export const login = (loginData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/auth", loginData, config);
    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: res.data,
    });
    Swal.fire({
      title: "Login",
      icon: "success",
      text: "Login Successful",
    }).then(()=>{
      dispatch(loadUser());
    })
   
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }
    dispatch({
      type: actionTypes.LOGIN_FAIL,
    });
  }
};

// Logout
export const logout = (history) => (dispatch) => {
  localStorage.removeItem('token')
  dispatch({ type: actionTypes.CLEAR_TODO });
  dispatch({ type: actionTypes.LOGOUT });
  history.push("/");
};
