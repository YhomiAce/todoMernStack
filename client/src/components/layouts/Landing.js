import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="container mt-4">
      <div className="jumbotron">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum accusamus magni iure. Nobis tempora recusandae facere asperiores exercitationem? Tenetur, quam?
        <div className="mt-2 text-center">
          <Link to="/register" className="btn btn-primary mr-2">
            Sign Up
          </Link>
          <Link to="/login" className="btn btn-light ml-2">
            Login
          </Link>
        </div>
      </div>

    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
