import ToDoList from './ToDoList';
import ToDoForm from './ToDoForm';
import React from 'react';
import apiUrl from '../config';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class ToDoBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    loadToDosFromServer() {
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
        todo.status = "New";
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': localStorage.jwt,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        }).then(response => response.json())
            .then((todo) => {
                let todos = this.state.data;
                todos.push(todo);
                this.setState({ data: todos });
            });
    }

    handleToDoDelete = (toDelete) => {
        fetch(apiUrl + "/" + toDelete.id, {
            method: 'DELETE',
            headers: {
                'Authorization': localStorage.jwt
            }
        });
        this.setState({ data: this.state.data.filter(todo => todo.id !== toDelete.id) });
    }

    componentDidMount() {
        this.loadToDosFromServer();
        setInterval(this.loadToDosFromServer, this.props.pollInterval);
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
        };
        this.updateToDo(todo);
        this.setState({ data: todos });
    }

    updateToDo(todo) {
        axios.put(apiUrl + '/todos/' + todo.id, todo, {
            headers: {
                'Authorization': localStorage.jwt
            }
        });
    }

    render() {
        return (
            <div className="todoBox">
                <ToDoForm onToDoSubmit={this.handleToDoSubmit} onSignOut={this.handleSignOut} />
                <ToDoList data={this.state.data} handleToDoDelete={this.handleToDoDelete} handleStatusChange={this.handleStatusChange} />
            </div>
        );
    }
}

export default withRouter(ToDoBox);
