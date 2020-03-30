import React from 'react';

class ToDo extends React.Component {
    text() {
        return this.props.children.toString();
    }
    render() {
        return (
            <div className="todo">
                <p>
                    <span><input id="done" type="checkbox" onClick={this.props.onToDoDelete}></input></span>
                    {this.text()}
                    <span><button id="delete" onClick={this.props.onToDoDelete}>Delete</button></span>
                    <hr></hr>
                </p>
            </div>
        );
    }
}

export default ToDo;
