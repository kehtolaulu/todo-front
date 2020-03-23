import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
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
                        <Route path="/login" component={Login} />
                        <Route exact path="/" component={Login} />
                        {/* <Route path="/todos" render={() => <ToDoBox url={todosPath} pollInterval={2000000} />} /> */}
                        <PrivateRoute path="/todos" component={() => <ToDoBox url={todosPath} pollInterval={2000000} />} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest}
            render={props => (isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />)} />
    );
}

const isAuthenticated = () => {
    return localStorage.jwt === "undefined" ? false : true;
}

export default App;