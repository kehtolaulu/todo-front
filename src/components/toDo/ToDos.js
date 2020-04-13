import React from 'react';
import ToDo from './ToDo';

class ToDos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toDos: [],
        };
    }

    componentDidMount = () => {
        // this.loadToDos();
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
                <h4>Tasks</h4>
                <div className="todo-list">
                    {toDos}
                </div>
            </div>
        );
    }
}

export default ToDos;
