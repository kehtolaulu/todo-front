import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import ToDoPage from './toDo/ToDoPage';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import React from 'react';

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <LoginRoute exact path="/signup" component={SignUp} />
                    <LoginRoute exact path="/login" component={Login} />
                    <Route exact path="/"> {<Redirect to="/todos" />} </Route>
                    <PrivateRoute exact path="/todos" component={ToDoPage} />
                </Switch>
            </Router>
        );
    }
}

const LoginRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest}
            render={props => (isAuthenticated() ? <Redirect to="/" /> : <Component {...props} />)} />
    );
}

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest}
            render={props => (isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />)} />
    );
}

const isAuthenticated = () => {
    return localStorage.jwt ? true : false;
}

export default App;
