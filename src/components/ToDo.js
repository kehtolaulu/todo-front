import React from 'react';

class ToDo extends React.Component {
    text = () => {
        return this.props.children.toString();
    }
    done = () => {
        return this.props.status === "done";
    }
    render() {
        return (
            <div className="todo row">
                <form className="todo-item col">
                    <label>
                        <input className="done"
                            type="checkbox"
                            onChange={this.props.onStatusChange}
                            checked={this.done()} >
                        </input>
                        <span></span>
                    </label>
                </form>
                <span className={"todo-" + this.props.status}>
                    {this.text()}
                </span>
                <span>
                    <button className="delete-button btn-flat black-text" onClick={this.props.onToDoDelete}>
                        <i class="material-icons">delete</i>
                    </button>
                </span >
                <hr></hr>
            </div >
        );
    }
}

export default ToDo;
