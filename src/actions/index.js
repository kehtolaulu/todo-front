import {
    ADD_TODO,
    TOGGLE_TODO,
    ADD_LIST,
    REQUEST_LISTS,
    RECEIVE_LISTS,
    LOAD_TODOS
} from '../constants/actionTypes';
import { getToDoLists } from '../api/todos';

export const addToDoList = (list) => ({
    type: ADD_LIST,
    list
});

export const addToDo = (todo) => ({
    type: ADD_TODO,
    todo
});

export const toggleToDo = (todo) => ({
    type: TOGGLE_TODO,
    todo
});

export const requestLists = () => ({
    type: REQUEST_LISTS
});

export const receiveLists = (lists) => ({
    type: RECEIVE_LISTS,
    lists
});

export const loadLists = () => {
    return dispatch => dispatch(fetchLists());
}

export const fetchLists = () => {
    return dispatch => {
        return getToDoLists()
            .then(lists => {
                dispatch(receiveLists(lists));
            });
    };
}

export const loadToDos = (todos) => ({
    type: LOAD_TODOS,
    todos
});
