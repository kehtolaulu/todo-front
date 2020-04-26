import { combineReducers } from 'redux';
import {
    ADD_TODO,
    TOGGLE_TODO,
    ADD_LIST,
    RECEIVE_LISTS,
    LOAD_TODOS
} from '../constants/actionTypes';

// const initialState = {
//     lists: {
//         currentList: {},
//         lists: {},
//     },
//     todos: {}
// };

const toDos = (state = { todos: {} }, action) => {
    switch (action.type) {
        case ADD_TODO:
            return state.todos.concat(action.todo);
        case TOGGLE_TODO:
            return state.todos.map((todo) => {
                if (todo._id === action.todo._id) {
                    return Object.assign({}, todo, {
                        status: !todo.completed
                    });
                }
                return todo;
            });
        case LOAD_TODOS:
            return { todos: action.todos };
        default:
            return state;
    }
};

const toDoLists = (state = { currentList: {}, lists: {} }, action) => {
    switch (action.type) {
        case RECEIVE_LISTS:
            debugger;
            return { currentList: action.lists[0], lists: action.lists };
        case ADD_LIST:
            return { currentList: state.lists[0], lists: state.lists.concat(action.list) };
        default:
            return state;
    }
};

const toDoApp = combineReducers({
    toDoLists,
    toDos
});

export default toDoApp;
