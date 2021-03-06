import apiUrl from '../config';
import axios from 'axios';

export const authenticate = (username, password) => axios.post(
    apiUrl + '/login',
    {
        username: username,
        password: password
    })
    .then(response => response.data)
    .then(response => {
        localStorage.jwt = response.token;
    });

export const register = (username, password) => axios.post(
    apiUrl + '/signup',
    {
        username: username,
        password: password
    }
);
