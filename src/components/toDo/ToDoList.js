import React from 'react';
import ToDo from './ToDo';

class ToDoList extends React.Component {
    render() {
        let toDos = this.props.toDos.map(todo => (
            <ToDo
                text={todo.text.toString()}
                key={todo._id}
                status={todo.status}
                onToDoDelete={() => this.props.handleToDoDelete(todo)}
                onStatusChange={() => this.props.handleStatusChange(todo)} />
        ));
        return (
            <div>
                <div className="todo-list">
                    {toDos}
                </div>
            </div>
        );
    }
}

export default ToDoList;
