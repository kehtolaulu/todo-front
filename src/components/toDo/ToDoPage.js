import ToDoList from './ToDoList';
import ToDoForm from './ToDoForm';
import ToDos from './ToDos';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { getToDos, deleteToDo, createToDo, toggleStatus, getToDoLists } from '../../api/todos';

class ToDoPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toDos: [],
            lists: []
        };
    }

    componentDidMount = () => {
        this.loadToDoLists();
    }

    loadToDoLists = () => {
        getToDoLists().then(lists => {
            this.setState({ lists: lists });
        });
        // this.setState({ toDos: this.state.lists[0].toDos })
    }

    handleToDoSubmit = (todo) => {
        createToDo(todo).then(response => {
            let todos = this.state.toDos;
            todos.push(response.todo);
            this.setState({ toDos: todos });
        });
    }

    handleToDoDelete = (toDelete) => {
        deleteToDo(toDelete);
        this.setState({ toDos: this.state.toDos.filter(todo => todo._id !== toDelete._id) });
    }

    handleSignOut = () => {
        localStorage.removeItem("jwt");
        this.props.history.push("/");
    }

    handleStatusChange = (todo) => {
        let todos = this.state.toDos;
        toggleStatus(todo);
        this.setState({ toDos: todos });
    }

    loadToDos = (list) => {
        getToDos(list).then(toDos => {
            this.setState({ toDos: toDos });
        });
    }

    onListChange = (list) => {
        this.loadToDos(list);
    }

    render() {
        let lists = this.state.lists.map(list => (
            <ToDoList
                key={list._id}
                title={list.title}
                onClick={() => this.onListChange(list)} />
        ));
        return (
            <div>
                <nav>
                    <div className="nav-wrapper brown lighten-3">
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="#!" className="black-text" onClick={this.handleSignOut}>Sign out</a></li>
                            <li></li>
                        </ul>
                    </div>
                </nav>
                <div>
                    <div className="row">
                        <div className="toDoLists col s3 offset-s1">
                            <div class="collection">
                                {lists}
                            </div>
                        </div>
                        <div className="toDoPage col s7">
                            <ToDoForm onToDoSubmit={this.handleToDoSubmit} />
                            <ToDos
                                todos={this.state.toDos}
                                handleToDoDelete={this.handleToDoDelete}
                                handleStatusChange={this.handleStatusChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ToDoPage);
