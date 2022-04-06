import React from "react";
import { useDispatch } from "react-redux";
import Moment from 'react-moment';
import {deleteTask} from '../../../actions/todo';
import { Link } from "react-router-dom";

const TodoItem = ({ todo, removeTodo, props }) => {
  const dispatch = useDispatch();
  return (
    <li className="list-group-item">
      <p className="mt-2">Todo: {todo.text}</p>
      
      <p className="float-left">Due: <Moment format="YYYY/MM/DD">{todo.dueDate}</Moment> {" "}</p>
      {
        todo.isCompleted ? <p className="mt-2 text-success">Completed</p> : <p className="mt-2 text-primary">Pending</p>
      }
      <i
        className="fa fa-trash text-danger float-right"
        style={{cursor: "pointer"}}
        onClick={() => dispatch(deleteTask(todo._id))}
      ></i>
      <Link to={`/edit-todo/${todo._id}`}>
      <i
        className="fa fa-edit text-info mr-2 float-right"
        style={{cursor: "pointer"}}
      ></i></Link>
      
    </li>
  );
};


export default TodoItem;
