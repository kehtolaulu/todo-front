import apiUrl from '../config';
import axios from 'axios';

export const getToDos = () => {
    return axios.get(apiUrl + '/todos', {
        headers: {
            'Authorization': localStorage.jwt
        }
    }).then(response => response.data);
};

export const saveToDo = (todo) => {
    return axios.post(apiUrl + '/todos',
        JSON.stringify(todo),
        {
            headers: {
                'Authorization': localStorage.jwt,
                'Content-Type': 'application/json'
            }
        }).then(response => response.data);
};

export const deleteToDo = (toDelete) => {
    axios.delete(apiUrl + "/todos/" + toDelete._id, {
        headers: {
            'Authorization': localStorage.jwt
        }
    });
};

export const updateToDo = (todo) => {
    axios.put(apiUrl + '/todos/' + todo._id, todo, {
        headers: {
            'Authorization': localStorage.jwt
        }
    });
};
