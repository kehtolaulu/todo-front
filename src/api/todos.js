import apiUrl from '../config';
import axios from 'axios';

// export const getToDos = () => {
//     return axios.get(
//         apiUrl + '/todos',
//         {
//             headers: {
//                 'Authorization': localStorage.jwt
//             }
//         }
//     ).then(response => response.data);
// };

export const getToDos = list => axios.get(
    apiUrl + '/todo_lists/' + list._id + '/todos',
    {
        headers: {
            'Authorization': localStorage.jwt
        }
    }
).then(response => response.data);

export const getToDoLists = () => {
    return axios.get(
        apiUrl + '/todo_lists',
        {
            headers: {
                'Authorization': localStorage.jwt
            }
        }
    ).then(response => response.data);
};

export const saveToDo = (todo, list) => axios.post(
    apiUrl + '/todo_lists/' + list._id + '/todos',
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
