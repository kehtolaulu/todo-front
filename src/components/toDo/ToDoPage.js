import ToDoListsPreview from './ToDoListsPreview';
import ToDoForm from './ToDoForm';
import ToDoList from './ToDoList';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { getToDos, deleteToDo, createToDo, toggleStatus, getToDoLists } from '../../api/todos';
import { createToDoList } from '../../api/toDoLists';

class ToDoPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: null,
            currentList: null
        };
    }

    componentDidMount = () => {
        this.loadToDoLists();
    }

    loadToDoLists = () => {
        if (!this.state.lists) {
            getToDoLists().then(lists => {
                this.setState({ lists: lists });
                this.setState({ currentList: lists[0] });
                this.loadToDos();
            });
        }
    }

    handleToDoSubmit = (todo) => {
        createToDo(todo, this.state.currentList).then(response => {
            let list = this.state.currentList;
            list.toDos.push(response.todo);
            this.setState({ currentList: list });
        });
    }

    handleToDoListSubmit = (list) => {
        createToDoList(list).then(response => {
            let newLists = this.state.lists;
            newLists.push(list);
            this.setState({ lists: newLists });
        });
    }

    handleToDoDelete = (toDelete) => {
        deleteToDo(toDelete, this.state.currentList);
        let newToDos = this.state.currentList.toDos.filter(todo => todo._id !== toDelete._id);
        let list = this.state.currentList;
        list.toDos = newToDos;
        this.setState({ currentList: list });
    }

    handleSignOut = () => {
        localStorage.removeItem("jwt");
        this.props.history.push("/");
    }

    handleStatusChange = (todo) => {
        let todos = this.state.toDos;
        toggleStatus(todo, this.state.currentList);
        this.setState({ toDos: todos });
    }

    onListChange = (list) => {
        this.setState({ currentList: list }, () => {
            this.loadToDos();
        });
    }

    loadToDos = () => {
        let currentList = this.state.currentList;
        getToDos(currentList).then(toDos => {
            currentList.toDos = toDos;
            this.setState({ currentList: currentList });
        });
    }

    render() {
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
                        <div className="to-do-lists col s2 offset-s1">
                            <ToDoListsPreview
                                lists={this.state.lists}
                                current={this.state.currentList}
                                onClick={this.onListChange}
                                onToDoListSubmit={this.handleToDoListSubmit} />
                        </div>
                        <div className="col s7 offset-s1">
                            <ToDoForm onToDoSubmit={this.handleToDoSubmit} />
                            {this.state.currentList ?
                                <ToDoList
                                    toDos={this.state.currentList.toDos}
                                    handleToDoDelete={this.handleToDoDelete}
                                    handleStatusChange={this.handleStatusChange}
                                /> : ""}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ToDoPage);
