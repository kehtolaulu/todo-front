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
            <form className="todoForm" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="To..."
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
                <input type="submit" value="Post" style={{ display: "none" }} />
            </form>
        );
    }
}

export default ToDoForm;
