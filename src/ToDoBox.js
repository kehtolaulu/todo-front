import ToDoList from './ToDoList.js';
import ToDoForm from './ToDoForm.js';
import React from 'react';
import $ from 'jquery';

class ToDoBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    loadToDosFromServer() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    handleToDoSubmit = (todo) => {
        var todos = this.state.data;
        todo.id = Date.now();
        var newToDos = todos.concat([todo]);
        this.setState({ data: newToDos });
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: todo,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                this.setState({ data: todos });
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    handleToDoDelete = (toDelete) => {
        fetch(this.props.url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(toDelete),
        }).then(data => {
            this.setState({ data: this.state.data.filter(todo => todo.id !== toDelete.id) });
        }).catch(error => {
            this.setState({ data: this.state.dataadd  });
            console.error(this.props.url, error.toString())
        });
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
