import React from 'react';
import ReactDOM from 'react-dom';
import ToDoBox from './ToDoBox.js';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <ToDoBox url="http://localhost:3030/api/todos" pollInterval={2000000} />,
    document.getElementById('content')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
