import React from 'react';
import apiUrl from '../config';
import axios from 'axios';
import 'materialize-css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: false
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
                this.setState({ error: true });
            });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <form className="col s4 offset-s4">
                        <div className="card">
                            <div className="card-content">
                                <span className="card-title">Login</span>
                                <div className="input-field">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        id="username"
                                        type="text"
                                        className="validate"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.handleUsernameChange}
                                    />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handlePasswordChange}
                                    />
                                    <span className="helper-text" data-error="wrong" data-success="right">{this.state.error && <p>Bad credentials</p>}</span>
                                </div>

                            </div>
                            <div className="card-action">
                                <button id="login-button" onClick={this.authenticate} className="btn-large">Login</button>
                                <a href="/signup" className="btn-flat">No account? Sign up</a>
                            </div>
                        </div>
                    </form >
                </div>
            </div>
        );
    }
}

export default Login;
