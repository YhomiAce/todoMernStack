/* eslint-disable no-extend-native */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateTodo } from '../../../actions/todo';
import { useParams } from "react-router-dom";
import Spinner from "../../layouts/Spinner";


const EditTodo = () => {
  const { id } = useParams()
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [formInput, setFormInput] = useState({
    todo: "",
    dueDate: "",
  });

  Date.prototype.toDateInputValue = (function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  });

  const getTodo = async () => {
    try {
      setLoading(true);
      const url = `http://localhost:5000/api/todo/${id}`;
      const request = await axios.get(url);
      const response = request.data.todo;
      // const date =moment(response.dueDate).format("DD/MM/YYYY");
      const date = new Date(response.dueDate).toDateInputValue();
      console.log(date, response);
      setLoading(false);
      setFormInput({
        todo: response.text,
        dueDate: date
      });
      setCompleted(response.isCompleted)
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("An Error Occured")
    }
  }

  useEffect(() => {
    getTodo()
  }, [])

  const { todo, dueDate } = formInput;
  const onChangeHandler = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (todo === "" || dueDate === "") {
      alert("Please fill all fields");
    }

    const payload = {
      text: todo,
      dueDate,
      isCompleted: completed
    };
    dispatch(updateTodo(payload, id))
    setFormInput({
      todo: "",
      dueDate: ""
    })
  }

  if (loading) {
    <Spinner />
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card border-primary">
          <div className="card-header">
            <h3>Edit A Todo</h3>
          </div>
          <div className="card-body">
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <label htmlFor="todo">Todo</label>
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
                  onChange={onChangeHandler}
                  className="form-control"
                  defaultValue={dueDate}
                />

              </div>
              <div className="form-group ml-3">

                <input
                  type="checkbox"
                  name="completed"
                  value={completed}
                  checked={completed ? 'checked' : ''}
                  onChange={() => setCompleted(!completed)}
                  className="form-check-input"
                />
                <label htmlFor="completed">Mark as Completed</label>
              </div>
              <button type="submit" className="btn btn-primary btn-block">Update Todo</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


export default EditTodo;
