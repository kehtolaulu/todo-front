import apiUrl from '../config';
import axios from 'axios';

export const getToDos = () => {
    return axios.get(
        apiUrl + '/todos',
        {
            headers: {
                'Authorization': localStorage.jwt
            }
        }
    ).then(response => response.data);
};

export const saveToDo = todo => axios.post(
    apiUrl + '/todos',
    JSON.stringify(todo),
    {
        headers: {
            'Authorization': localStorage.jwt,
            'Content-Type': 'application/json'
        }
    }
).then(response => response.data);

export const createToDo = todo => {
    todo.status = "new";
    return saveToDo(todo);
};

export const deleteToDo = toDelete => axios.delete(
    apiUrl + "/todos/" + toDelete._id, {
    headers: {
        'Authorization': localStorage.jwt
    }
});

export const updateToDo = todo => axios.put(
    apiUrl + '/todos/' + todo._id,
    todo,
    {
        headers: {
            'Authorization': localStorage.jwt
        }
    }
);

export const toggleStatus = todo => {
    if (todo.status === "done") {
        todo.status = "new";
    } else {
        todo.status = "done";
    }
    updateToDo(todo);
};
