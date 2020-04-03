import React from 'react';
import apiUrl from '../config';
import axios from 'axios';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordTwice: '',
            errorText: ''
        };
    }

    handleUsernameChange = (e) => {
        let newUsername = e.target.value;
        if (newUsername.length < 6) {
            this.setState({ username: e.target.value });
            this.setState({ errorText: 'Username must be 6 chars min' })
        } else {
            this.setState({ username: e.target.value });
            this.setState({ errorText: '' })
        }
    }

    handlePasswordChange = (e) => {
        let newPassword = e.target.value;
        if (newPassword.length < 6) {
            this.setState({ password: e.target.value });
            this.setState({ errorText: 'Password must be 6 chars min' });
        } else {
            this.setState({ password: e.target.value });
            this.setState({ errorText: '' });
        }
    }

    handlePasswordTwiceChange = (e) => {
        if (this.state.password !== e.target.value) {
            this.setState({ passwordTwice: e.target.value });
            this.setState({ errorText: 'Passwords should match' });
        } else {
            this.setState({ passwordTwice: e.target.value });
            this.setState({ errorText: '' });
        }
    }

    signUp = (e) => {
        e.preventDefault();
        let username = this.state.username.trim();
        let password = this.state.password.trim();
        axios.post(apiUrl + '/signup', {
            username: username,
            password: password
        })
            .then(response => {
                this.props.history.push("/login");
            })
            .catch((error) => {
                console.log(error);
                this.setState({ errorText: error });
            });
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
                <input
                    type="password"
                    name="passwordTwice"
                    placeholder="Password again"
                    value={this.state.passwordTwice}
                    onChange={this.handlePasswordTwiceChange}
                />
                <br />
                <button id="signUpButton" onClick={this.signUp}>Sign up</button>
                <br />
                <div id="error"><p>{this.state.errorText}</p></div>
            </form>
        );
    }
}

export default SignUp;
