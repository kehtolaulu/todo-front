import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore } from 'redux';
import toDoApp from './reducers/app';
import { Provider } from 'react-redux';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/materialize-css/dist/js/materialize.min.js';

const store = createStore(toDoApp);

ReactDOM.render((
    <Provider store={store}>
        <App />,
    </Provider>
), document.getElementById('content')
);
