import React from 'react';
import ToDo from './ToDo';
import { getToDos } from '../../api/todos';

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toDos: [],
        };
    }

    componentDidMount = () => {
        this.loadToDos();
    }

    loadToDos = () => {
        getToDos(this.props.list).then(toDos => {
            this.setState({ toDos: toDos });
        });
    }

    render() {
        let toDos = this.state.toDos.map(todo => (
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
