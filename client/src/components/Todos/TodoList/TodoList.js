import React, { useEffect } from 'react';
import TodoItem from './TodoItem';
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos } from '../../../actions/todo';


const TodoList = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state) => {
        return state.todo.todos
    })
    useEffect(() => {
        dispatch(fetchTodos())
    }, [dispatch]);
    console.log(todos.reverse());
    return (
        <div className='text-center'>
            <h4 className="text-center">Todos</h4>
            <ul className="list-group">
                {
                    todos !== null ? todos.map(todo => {
                        return <TodoItem key={todo._id} todo={todo} />
                    }) : <h3>No Todo</h3>
                }



            </ul>
        </div>
    )
}


export default TodoList;
