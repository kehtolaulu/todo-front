import ToDoListsPreview from './ToDoListsPreview';
import ToDoForm from './ToDoForm';
import ToDoList from './ToDoList';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { getToDos, deleteToDo, createToDo, toggleStatus, getToDoLists } from '../../api/todos';

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
        getToDoLists().then(lists => {
            this.setState({ lists: lists });
            this.setState({ currentList: lists[0] });
            this.loadToDos(this.state.currentList);
        });
    }

    handleToDoSubmit = (todo) => {
        createToDo(todo, this.state.currentList).then(response => {
            let list = this.state.currentList;
            list.toDos.push(response.todo);
            this.setState({ currentList: list });
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

    onListChange = (list) => {
        this.setState({ currentList: list });
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
                        <div className="to-do-lists col s3 offset-s1">
                            <ToDoListsPreview
                                lists={this.state.lists}
                                current={this.state.currentList}
                                onClick={this.onListChange} />
                        </div>
                        <div className="col s7">
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
