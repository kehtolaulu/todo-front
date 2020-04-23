import React from 'react';
import ToDoListPreview from './ToDoListPreview';

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

    handleListUpdate = (e, list) => {
        this.props.onToDoListUpdate(list, e.target.value);
    }

    render() {
        let current = this.props.current?._id;
        return (
            <div>
                <div className="lists">
                    {(this.props.lists || []).map(list => (
                        <ToDoListPreview
                            list={list}
                            isCurrent={list._id === current}
                            onClick={() => this.props.onClick(list)}
                            onListUpdate={(e) => this.handleListUpdate(e, list)}
                            onListDelete={() => this.props.onToDoListDelete(list)}
                        />
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
