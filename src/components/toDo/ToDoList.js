import React from 'react';

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        // this.setState({});
    }

    render() {
        return (
            <div>
                <a href="#!" class="collection-item">{this.props.title}</a>
            </div>
        );
    }
}

export default ToDoList;
