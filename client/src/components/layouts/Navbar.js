import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { logout } from "../../actions/auth";


const Navbar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.auth);
    const { loading, isAuthenticated } = user;
    const logoutHandler = () => {
        dispatch(logout(history));
    };

    const authLinks = (
        <>
            {/* <li className="nav-item ml-3 text-white">
                <Link to="/create-todo">Todos</Link>
            </li> */}
            <li className="nav-item ml-3">
                <Link to="/dashboard">
                    {" "}
                    <i className="fas fa-user"></i> Dashboard
                </Link>
            </li>
            <li className="nav-item ml-3">
                <a href="#!" onClick={logoutHandler}>
                    <i className="fas fa-sign-out-alt"></i>{" "}
                    <span className="hide-sm">Logout</span>
                </a>
            </li>
        </>
    );

    const guestLinks = (
        < >
            <li className="nav-item ml-3">
                <Link className="nav-link" to="/register">Sign Up</Link>
            </li>
            <li className="nav-item ml-3">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
        </>
    );

    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">XpressTodo</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarContent">
                    {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">Home</Link>
                        </li>
                    </ul> */}
                    <ul className="navbar-nav ml-auto align-items-center">
                        {!loading && (
                            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
                        )}
                        

                    </ul>
                </div>
            </div>
        </nav>
    );
};


export default (Navbar)

