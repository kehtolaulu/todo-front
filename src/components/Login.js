import React from 'react';
import apiUrl from '../config';

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
        fetch(apiUrl + "/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        })
            .then(response => {
                if (!response.ok) {
                    debugger
                    this.setState({ error: true });
                } else {
                    // response.json();
                    localStorage.jwt = response.token;
                    this.props.history.push("/todos")
                }
            })
    }

    render() {
        return (
            <form id="login-form">
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.handleUsernameChange}
                />
                <br />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                />
                <br />
                <button id="loginButton" onClick={this.authenticate}>Login</button>
                <br />
                <div id="error">{this.state.error && <p>Incorrect login or password</p>}</div>
            </form>
        );
    }
}

export default Login;