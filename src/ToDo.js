import React from 'react';
import {Remarkable} from 'remarkable';

class ToDo extends React.Component {
    rawMarkup() {
        var md = new Remarkable();
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    }
    render() {
        return (
            <div className="todo">
                <span dangerouslySetInnerHTML={this.rawMarkup()}></span>
                <button onClick={this.props.onToDoDelete}>done</button>
                <hr></hr>
            </div>
        );
    }
}

export default ToDo;