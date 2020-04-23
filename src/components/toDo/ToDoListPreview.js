import React from 'react'; // eslint-disable-line no-unused-vars

const ToDoListPreview = ({ list, isCurrent, onClick, onListUpdate, onListDelete }) => (
    <div className="input-field collection-item">
        <i className="material-icons prefix ">format_list_bulleted</i>
        <input type="text"
            className={"list-input " + (isCurrent ? "active" : "")}
            onClick={onClick}
            key={list._id}
            defaultValue={list.title}
            onChange={onListUpdate} />
        <button className={"right-align btn-flat delete-button-span prefix " + (isCurrent ? "" : "hide")}
            disabled={!isCurrent} onClick={onListDelete}>
            <i className="material-icons right">delete</i>
        </button>
    </div>
);

export default ToDoListPreview;
