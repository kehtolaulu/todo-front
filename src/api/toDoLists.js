import apiUrl from '../config';
import axios from 'axios';

export const createToDoList = list => axios.post(
    apiUrl + '/todo_lists',
    list,
    {
        headers: {
            'Authorization': localStorage.jwt
        }
    }
).then(response => response.data);
