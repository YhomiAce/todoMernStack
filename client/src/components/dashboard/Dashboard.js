import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layouts/Spinner";
import TodoList from "../Todos/TodoList/TodoList";


const Dashboard = () => {
  const auth = useSelector(state => state.auth);
  return (

    <div className="row justify-content-center">

      <div className="col-md-8">
        {
          auth.loading && auth.user == null ? <Spinner /> :

            <div className="card">
              <div className="card-header">
                <p>Welcome {auth.user.name}</p>
                <Link className="btn btn-info float-right" to='/create-todo'>Add Todo</Link>
              </div>
              <div className="card-body mt-2 mb-2">
                <TodoList />
              </div>
            </div>
        }
      </div>
    </div>
  );
}


export default Dashboard;