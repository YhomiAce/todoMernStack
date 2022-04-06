import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;
  const changeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !password2) {
      dispatch(setAlert("Please Fill All Fields", "danger"));
    } else if (password !== password2) {
      dispatch(setAlert("passwords do not match", "danger"));
    } else {
      console.log(formData);
      const newUser = {
        name,
        email,
        password,
      };
      dispatch(register(newUser, history));
      console.log("Success");
    }
  };

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
                <p className="lead">
                  <i className="fas fa-user"></i> Create Your Account
                </p>
              </p>
            </div>
            <div className="card-body">
              <form className="form" onSubmit={submitHandler}>
                <div className="form-group">
                <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={changeHandler}
                  />
                </div>
                <div className="form-group">
                <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={changeHandler}
                  />
                </div>
                <div className="form-group">
                <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    name="password"
                    minLength="5"
                    value={password}
                    onChange={changeHandler}
                  />
                </div>
                <div className="form-group">
                <label htmlFor="password2">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="form-control"
                    name="password2"
                    minLength="5"
                    value={password2}
                    onChange={changeHandler}
                  />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
              </form>
              <p className="my-1 float-right">
                Already have an account? <Link to="/login">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

    </Fragment>
  );
};



export default Register;
