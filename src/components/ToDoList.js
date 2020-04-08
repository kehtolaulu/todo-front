import React from 'react';
import ToDo from './ToDo'

class ToDoList extends React.Component {
    render = () => {
        var todoNodes = this.props.data.map((todo) => {
            return (
                <ToDo key={todo._id} status={todo.status}
                    onToDoDelete={() => this.props.handleToDoDelete(todo)}
                    onStatusChange={() => this.props.handleStatusChange(todo)}>
                    {todo.text}
                </ToDo>
            );
        });
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
