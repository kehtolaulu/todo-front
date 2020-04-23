import React from 'react'; // eslint-disable-line no-unused-vars
import ToDo from './ToDo';

const ToDoList = ({ toDos, handleToDoDelete, handleStatusChange }) => (
    <div>
        <div className="todo-list">
            {toDos.map(todo => (
                <ToDo
                    text={todo.text.toString()}
                    key={todo._id}
                    status={todo.status}
                    onToDoDelete={() => handleToDoDelete(todo)}
                    onStatusChange={() => handleStatusChange(todo)} />
            ))}
        </div>
    </div>
);

export default ToDoList;
