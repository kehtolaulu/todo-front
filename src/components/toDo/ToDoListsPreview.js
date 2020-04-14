import React from 'react';

class ToDoListsPreview extends React.Component {
    render() {
        let current = this.props.current?._id;
        return (
            <div className="collection">
                {(this.props.lists || []).map(list => (
                    <a href="#!"
                        className={"collection-item " + (list._id === current ? "active" : "")}
                        onClick={() => this.props.onClick(list)}
                        key={list._id}>
                        {list.title}
                    </a>
                ))}
            </div>
        );
    }
}

export default ToDoListsPreview;
