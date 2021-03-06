import React from 'react';

class ToDoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        };
    }

    handleTextChange = (e) => {
        this.setState({ text: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var text = this.state.text.trim();
        if (!text) {
            return;
        }
        this.props.onToDoSubmit({ text: text });
        this.setState({ text: '' });
    }

    render() {
        return (
            <div className="form-container">
                <form className="todo-form" onSubmit={this.handleSubmit}>
                    <input
                        className="input-field"
                        size="50"
                        type="text"
                        placeholder="Write to do here!"
                        value={this.state.text}
                        onChange={this.handleTextChange}
                    />
                    <input type="submit" value="Post" className="hide" />
                </form>
            </div>
        );
    }
}

export default ToDoForm;
