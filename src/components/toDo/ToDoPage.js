import ToDoList from './ToDoList';
import ToDoForm from './ToDoForm';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { getToDos, deleteToDo, createToDo, toggleStatus } from '../../api/todos';

class ToDoPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    loadToDosFromServer = () => {
        getToDos().then(todos => {
            this.setState({ data: todos });
        });
    }

    handleToDoSubmit = (todo) => {
        createToDo(todo).then(response => {
            let todos = this.state.data;
            todos.push(response.todo);
            this.setState({ data: todos });
        });
    }

    handleToDoDelete = (toDelete) => {
        deleteToDo(toDelete);
        this.setState({ data: this.state.data.filter(todo => todo._id !== toDelete._id) });
    }

    componentDidMount = () => {
        this.loadToDosFromServer();
    }

    handleSignOut = () => {
        localStorage.removeItem("jwt");
        this.props.history.push("/");
    }

    handleStatusChange = (todo) => {
        let todos = this.state.data;
        toggleStatus(todo);
        this.setState({ data: todos });
    }

    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper brown lighten-3">
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a className="black-text" onClick={this.handleSignOut}>Sign out</a></li>
                            <li></li>
                        </ul>
                    </div>
                </nav>
                <div className="toDoPage">
                    <ToDoForm onToDoSubmit={this.handleToDoSubmit} />
                    <ToDoList
                        todos={this.state.data}
                        handleToDoDelete={this.handleToDoDelete}
                        handleStatusChange={this.handleStatusChange}
                    />
                </div>
            </div>
        );
    }
}

export default withRouter(ToDoPage);
