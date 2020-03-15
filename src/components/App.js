import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import ToDoBox from './ToDoBox';
import Login from './Login';
import React from 'react';
import apiUrl from '../config';

let todosPath = `${apiUrl}/todos`;

class App extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route path="/todos" render={() => <ToDoBox url={todosPath} pollInterval={2000000} />} />
                        <Route path="/login" component={Login} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;