import axios from 'axios';
import Swal from "sweetalert2";
import * as actionType from './type';

const BASE_URL = "http://localhost:5000/api";


export const addTodo = payload => {
    return {
        type: actionType.ADD_TODO,
        payload
    }
}

export const editTodo = payload => {
    return {
        type: actionType.UPDATE_TODO,
        payload
    }
}

export const getTodos = payload => {
    return {
        type: actionType.FETCH_TODOS,
        payload
    }
}

export const deleteTodo = id => {
    return {
        type: actionType.DELETE_TODO,
        payload: id
    }
}

export const getError = () => {
    return {
        type: actionType.ERROR
    }
}

export const fetchTodos = () => {
    return async (dispatch) => {

        try {

            const url = `${BASE_URL}/todo`;
            const request = await axios.get(url);
            const response = request.data.todos;
            // console.log(response);
            dispatch(getTodos(response))
        } catch (error) {
            console.log(error.response);
            dispatch(getError());
        }

    }
}

export const createTodo = (payload) => {
    return async (dispatch) => {
        try {
            const url = `${BASE_URL}/todo`;

            const request = await axios.post(url, payload)
            const response = request.data;
            // console.log(response);
            Swal.fire({
                title: "Success",
                icon: "success",
                text: "Todo Created Successfully",
            }).then(() => {
                dispatch(addTodo(response.todo));
                window.location.href = '/dashboard';
            })
        } catch (error) {
            Swal.fire({
                title: "Error",
                icon: "danger",
                text: "Fail to Create Todo",
            })
        }

    }
}

export const updateTodo = (payload, id) => {
    return async (dispatch) => {
        try {
            const url = `${BASE_URL}/todo/${id}`;

            const request = await axios.patch(url, payload)
            const response = request.data;
            // console.log(response);
            Swal.fire({
                title: "Success",
                icon: "success",
                text: "Todo Updated Successfully",
            }).then(() => {
                dispatch(editTodo(response.todo));
                window.location.href = '/dashboard';
            })
        } catch (error) {
            Swal.fire({
                title: "Error",
                icon: "danger",
                text: "Fail to Update Todo",
            })
        }

    }
}

export const deleteTask = (id) => {
    return async (dispatch) => {
        try {
            const url = `${BASE_URL}/todo/${id}`;

            await axios.delete(url);
            dispatch(deleteTodo(id));
        } catch (error) {
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Fail to Delete Todo",
            })
        }

    }
}