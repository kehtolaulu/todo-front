import apiUrl from '../config';
import axios from 'axios';

export const getToDos = list => axios.get(
    `${apiUrl}/todo_lists/${list._id}/todos`,
    {
        headers: {
            'Authorization': localStorage.jwt
        }
    }
).then(response => response.data);

export const getToDoLists = () => {
    return axios.get(
        `${apiUrl}/todo_lists`,
        {
            headers: {
                'Authorization': localStorage.jwt
            }
        }
    ).then(response => response.data);
};

export const saveToDo = (todo, list) => axios.post(
    `${apiUrl}/todo_lists/${list._id}/todos`,
    JSON.stringify(todo),
    {
        headers: {
            'Authorization': localStorage.jwt,
            'Content-Type': 'application/json'
        }
    }
).then(response => response.data);

export const createToDo = (todo, list) => {
    todo.status = "new";
    return saveToDo(todo, list);
};

export const deleteToDo = (todo, list) => axios.delete(
    `${apiUrl}/todo_lists/${list._id}/todos/${todo._id}`,
    {
        headers: {
            'Authorization': localStorage.jwt
        }
    });

export const updateToDo = (todo, list) => axios.put(
    `${apiUrl}/todo_lists/${list._id}/todos/${todo._id}`,
    todo,
    {
        headers: {
            'Authorization': localStorage.jwt
        }
    }
);

export const toggleStatus = (todo, list) => {
    if (todo.status === "done") {
        todo.status = "new";
    } else {
        todo.status = "done";
    }
    updateToDo(todo, list);
};
