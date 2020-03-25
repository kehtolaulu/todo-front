import ToDoList from './ToDoList';
import ToDoForm from './ToDoForm';
import React from 'react';
import apiUrl from '../config';

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
                debugger
                this.setState({ data: todos });
            });
    }

    handleToDoSubmit = (todo) => {
        fetch(this.props.url, {
            method: 'POST',
            headers: {
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
        fetch(this.props.url + "/" + toDelete.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        this.setState({ data: this.state.data.filter(todo => todo.id !== toDelete.id) });
    }

    componentDidMount() {
        this.loadToDosFromServer();
        setInterval(this.loadToDosFromServer, this.props.pollInterval);
    }

    render() {
        return (
            <div className="todoBox">
                <h1>To do</h1>
                <ToDoList data={this.state.data} handleToDoDelete={this.handleToDoDelete} />
                <ToDoForm onToDoSubmit={this.handleToDoSubmit} />
            </div>
        );
    }
}

export default ToDoBox;
