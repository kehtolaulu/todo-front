import { connect } from 'react-redux';
import ToDoPage from '../components/toDo/ToDoPage';

const mapStateToProps = state => ({
    lists: state.lists,
    currentList: state.currentList,
    todos: state.todos
});

export default connect(mapStateToProps)(ToDoPage);
