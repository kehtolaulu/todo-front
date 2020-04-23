import apiUrl from '../config';
import axios from 'axios';

export const createToDoList = list => axios.post(
    `${apiUrl}/todo_lists`,
    list,
    {
        headers: {
            'Authorization': localStorage.jwt
        }
    }
).then(response => response.data);

export const deleteToDoList = list => axios.delete(
    `${apiUrl}/todo_lists/${list._id}`,
    {
        headers: {
            'Authorization': localStorage.jwt
        }
    }
).then(response => response.data);

export const updateToDoList = (list, title) => axios.post(
    `${apiUrl}/todo_lists/${list._id}`,
    { title },
    {
        headers: {
            'Authorization': localStorage.jwt
        }
    }
).then(response => response.data);
