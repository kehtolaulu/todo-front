import React from 'react';

class ToDo extends React.Component {
    text = () => {
        return this.props.children.toString();
    }
    done = () => {
        return this.props.status === "done";
    }
    render = () => {
        return (
            <div className="todo" >
                <p className={this.props.status} >
                    <span><input id="done"
                        type="checkbox"
                        onClick={this.props.onStatusChange}
                        checked={this.done()} >
                    </input>
                    </span>
                    {this.text()} <span><a id="delete" onClick={this.props.onToDoDelete}> Delete </a></span >
                </p>
                <hr></hr>
            </div>
        );
    }
}

export default ToDo;
