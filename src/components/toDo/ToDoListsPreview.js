import React from 'react';

class ToDoListsPreview extends React.Component {
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
        this.props.onToDoListSubmit({ title: text });
        this.setState({ text: '' });
    }

    render() {
        let current = this.props.current?._id;
        return (
            <div className="collection">
                <div>
                    {(this.props.lists || []).map(list => (
                        <a href="#!"
                            className={"collection-item " + (list._id === current ? "active" : "")}
                            onClick={() => this.props.onClick(list)}
                            key={list._id}>
                            {list.title}
                        </a>
                    ))}
                </div>
                <div className="collection-item">
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <div className="input-field">
                                <i className="material-icons prefix">create_new_folder</i>
                                <input
                                    className="input-field"
                                    type="text"
                                    placeholder="New list"
                                    value={this.state.text}
                                    onChange={this.handleTextChange}
                                />
                                <input type="submit" value="Post" className="hide" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default ToDoListsPreview;
