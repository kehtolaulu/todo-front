import ToDoList from './ToDoList';
import ToDoForm from './ToDoForm';
import React from 'react';
import apiUrl from '../../config';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class ToDoBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    loadToDosFromServer = () => {
        fetch(apiUrl + '/todos', {
            headers: {
                'Authorization': localStorage.jwt
            }
        })
            .then(response => response.json())
            .then(todos => {
                this.setState({ data: todos });
            });
    }

    handleToDoSubmit = (todo) => {
        todo.status = "new";
        fetch(apiUrl + '/todos', {
            method: 'POST',
            headers: {
                'Authorization': localStorage.jwt,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        }).then(response => response.json())
            .then((response) => {
                let todos = this.state.data;
                todos.push(response.todo);
                this.setState({ data: todos });
            });
    }

    handleToDoDelete = (toDelete) => {
        fetch(apiUrl + "/todos/" + toDelete._id, {
            method: 'DELETE',
            headers: {
                'Authorization': localStorage.jwt
            }
        });
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
        if (todo.status === "done") {
            todo.status = "new";
        } else {
            todo.status = "done";
        }
        this.updateToDo(todo);
        this.setState({ data: todos });
    }

    updateToDo = (todo) => {
        axios.put(apiUrl + '/todos/' + todo._id, todo, {
            headers: {
                'Authorization': localStorage.jwt
            }
        });
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
                <div className="todoBox">
                    <ToDoForm onToDoSubmit={this.handleToDoSubmit} />
                    <ToDoList
                        data={this.state.data}
                        handleToDoDelete={this.handleToDoDelete}
                        handleStatusChange={this.handleStatusChange}
                    />
                </div>
            </div>
        );
    }
}

export default withRouter(ToDoBox);