import React from 'react';
import { connect } from 'react-redux';
import { addToDoList } from '../actions';

const AddToDoList = ({ dispatch }) => {
    let input;

    handleSubmit = (e) => {
        e.preventDefault();
        var text = this.state.text.trim();
        if (!text) {
            return;
        }

        dispatch(addToDoList(input.value))
        // this.props.onToDoListSubmit({ title: text });

        // this.setState({ text: '' });
    }

    return (
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
    )
};

export default connect()(AddToDoList);
