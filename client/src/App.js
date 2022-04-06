import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Alert from "./components/layouts/Alert";
import Landing from "./components/layouts/Landing";
import Navbar from "./components/layouts/Navbar";
import setAuthToken from "./utils/setAuthHeader";
import store from "./store";
import { loadUser } from "./actions/auth";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import TodoForm from "./components/Todos/TodoForm/TodoForm";
import EditTodo from "./components/Todos/TodoForm/EditTodo";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container mt-5">
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/create-todo" component={TodoForm} />
            <PrivateRoute exact path="/edit-todo/:id" component={EditTodo} />
            
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
};

export default App;
