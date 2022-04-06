import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../actions/auth";
import { setAlert } from "../../actions/alert";

const Login = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = loginData;

  const changeHandler = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const submitHandler = (e) => {
    e.preventDefault();
    if ( !email || !password) {
      dispatch(setAlert("Please Fill All Fields", "danger"));
    }
    dispatch(login(loginData));
    console.log("Success");
  };

  // redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <p className="lead">
                <i className="fas fa-user"></i> Sign Into Your Account
              </p>
            </div>
            <div className="card-body">
              <form className="" onSubmit={submitHandler}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={changeHandler}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={changeHandler}
                  />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
              </form>
              <p className="my-1 float-right">
                Don't have an account? <Link to="/register">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      
    </Fragment>
  );
};


export default Login;
