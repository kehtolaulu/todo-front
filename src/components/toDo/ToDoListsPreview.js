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
            <div>
                <div className="lists">
                    {(this.props.lists || []).map(list => (
                        <div className="input-field collection-item">
                            <i class="material-icons prefix ">format_list_bulleted</i>
                            <input type="text"
                                className={"list-input " + (list._id === current ? "active" : "")}
                                onClick={() => this.props.onClick(list)}
                                key={list._id}
                                value={list.title} />
                            <button className={"delete-list-button btn-flat delete-button-span prefix " + (list._id === current ? "" : "hide")}
                                disabled={!(list._id === current)} onClick={() => this.props.onToDoListDelete(list)}>
                                <i className="material-icons right">delete</i>
                            </button>
                        </div>
                    ))}
                </div>
                <div>
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
