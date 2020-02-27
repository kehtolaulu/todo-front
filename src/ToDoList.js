import React from 'react';
import ToDo from './ToDo.js'

class ToDoList extends React.Component {
    render() {
        var todoNodes = this.props.data.map((todo) => {
            return (
                <ToDo key={todo.id} onToDoDelete={ () => this.props.handleToDoDelete(todo) }>
                    {todo.text}
                </ToDo>
            );
        });
        return (
            <div className="todoList">
                {todoNodes}
            </div>
        );
    }
}

export default ToDoList;