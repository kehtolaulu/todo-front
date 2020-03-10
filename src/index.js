import React from 'react';
import ReactDOM from 'react-dom';
import ToDoBox from './ToDoBox.js';

ReactDOM.render(
    <ToDoBox url="http://localhost:3030/api/todos" pollInterval={2000000} />,
    document.getElementById('content')
);
