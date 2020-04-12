import React from 'react';
import ToDo from './ToDo'

class ToDoList extends React.Component {
    render() {
        let todoNodes = this.props.todos.map(todo => (
            <ToDo
                text={todo.text.toString()}
                key={todo._id}
                status={todo.status}
                onToDoDelete={() => this.props.handleToDoDelete(todo)}
                onStatusChange={() => this.props.handleStatusChange(todo)} />
        ));
        return (
            <div>
                <h4>Tasks</h4>
                <div className="todo-list">
                    {todoNodes}
                </div>
            </div>
        );
    }
}

export default ToDoList;
