import * as actionType from '../actions/type';

const initialStae = {
    todos: []
}

const TodoReducer = (state = initialStae, action) => {
    const { type, payload } = action;
    switch (type) {
        case actionType.FETCH_TODOS:
            return {
                ...state,
                todos: payload
            }
        case actionType.ERROR:
            return {
                ...state,
                todos: []
            }
        case actionType.ADD_TODO:
            return {
                ...state,
                todos: state.todos.concat(payload)
            }
        case actionType.DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo._id !== payload)
            }
        case actionType.CLEAR_TODO:
            return {
                ...state,
                todos: []
            }
        case actionType.UPDATE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => todo._id === action.payload._id ? action.payload : todo),
                loading: false
            }

        default: return state
    }
}

export default TodoReducer;