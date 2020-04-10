import React from 'react';
import apiUrl from '../../config';
import axios from 'axios';
import 'materialize-css';
import UsernameField from './UsernameField';
import PasswordField from './PasswordField';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: ''
        };
    }

    handleUsernameChange = (e) => {
        this.setState({ username: e.target.value });
    }

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }

    authenticate = (e) => {
        e.preventDefault();
        let username = this.state.username.trim();
        let password = this.state.password.trim();
        axios.post(apiUrl + '/login', {
            username: username,
            password: password
        })
            .then(response => {
                localStorage.jwt = response.data.token;
                this.props.history.push("/todos");
            })
            .catch((error) => {
                console.log(error);
                this.setState({ error: 'Bad credentials' });
            });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="login">
                        <form className="col s4 offset-s4">
                            <div className="card">
                                <div className="card-content">
                                    <span className="card-title">Login</span>
                                    <UsernameField
                                        value={this.state.username}
                                        onChange={this.handleUsernameChange} />
                                    <PasswordField
                                        value={this.state.password}
                                        onChange={this.handlePasswordChange}
                                        error={this.state.error} />
                                </div>
                                <div className="card-action">
                                    <button onClick={this.authenticate} className="btn-large brown lighten-2 login-button">Login</button>
                                    <a href="/signup" className="btn-flat black-text">Sign up</a>
                                </div>
                            </div>
                        </form >
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
