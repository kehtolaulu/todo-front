import React from 'react';

const ToDo = ({text, status, onStatusChange, onToDoDelete}) => (
    <div className="todo row">
        <form className="todo-item col">
            <label>
                <input className="done"
                    type="checkbox"
                    checked={status === "done"}
                    onChange={onStatusChange}>
                </input>
                <span></span>
            </label>
        </form>
        <span className={"todo-" + status}>
            {text}
        </span>
        <span>
            <button className="delete-button btn-flat black-text" onClick={onToDoDelete}>
                <i className="material-icons">delete</i>
            </button>
        </span>
        <hr></hr>
    </div>
);

export default ToDo;
