import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {createTodo} from '../../../actions/todo'

const TodoForm = () => {
  const dispatch = useDispatch();
  const [formInput, setFormInput] = useState({
    todo: "",
    dueDate: "",
  });

  const { todo, dueDate } = formInput;
  const onChangeHandler = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) =>{ 
    e.preventDefault();
    if (todo === "" || dueDate === "") {
      alert("Please fill all fields");
    }
  
    const payload = {
      text: todo,
      dueDate
    };
    dispatch(createTodo(payload))
    setFormInput({
      todo: "",
      dueDate: ""
    })
  }
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card border-primary">
          <div className="card-header">
            <h3>Add A Todo</h3>
          </div>
          <div className="card-body">
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <label htmlFor="todo">Enter Todo</label>
                <input
                  type="text"
                  name="todo"
                  value={todo}
                  onChange={onChangeHandler}
                  className="form-control"
                />
              </div>
              <div className="form-group">
              <label htmlFor="due">Due Date</label>
              <input
                  type="date"
                  name="dueDate"
                  value={dueDate}
                  onChange={onChangeHandler}
                  className="form-control"
                />
                
              </div>
              <button type="submit" className="btn btn-primary btn-block">Add Todo</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


export default TodoForm;
