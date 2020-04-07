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
            usernameError: '',
            passwordError: '',
            passwordTwiceError: ''
        };
    }

    handleUsernameChange = (e) => {
        let newUsername = e.target.value;
        if (newUsername.length < 6) {
            this.setState({ username: e.target.value });
            this.setState({ usernameError: 'Username must be 6 chars min' })
        } else {
            this.setState({ username: e.target.value });
            this.setState({ usernameError: '' })
        }
    }

    handlePasswordChange = (e) => {
        let newPassword = e.target.value;
        if (newPassword.length < 6) {
            this.setState({ password: e.target.value });
            this.setState({ passwordError: 'Password must be 6 chars min' });
        } else {
            this.setState({ password: e.target.value });
            this.setState({ passwordError: '' });
        }
    }

    handlePasswordTwiceChange = (e) => {
        if (this.state.password !== e.target.value) {
            this.setState({ passwordTwice: e.target.value });
            this.setState({ passwordTwiceError: 'Passwords should match' });
        } else {
            this.setState({ passwordTwice: e.target.value });
            this.setState({ passwordTwiceError: '' });
        }
    }

    signUp = (e) => {
        e.preventDefault();
        let username = this.state.username.trim();
        let password = this.state.password.trim();
        if (!username.length || !password.length) {
            this.setState({ passwordTwiceError: "Fill fields!" })
        }
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
            <div className="container">
                <div className="row">
                    <form className="col s4 offset-s4">
                        <div className="card">
                            <div className="card-content">
                                <span className="card-title">Sign up</span>
                                <div className="input-field">
                                    <input
                                        id="username"
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        className="validate"
                                        value={this.state.username}
                                        onChange={this.handleUsernameChange}
                                    />
                                    <div className="error">
                                        <span className="helper-text" data-error="wrong" data-success="right">{this.state.usernameError}</span>
                                    </div>
                                </div>
                                <div className="input-field">
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.handlePasswordChange}
                                    />
                                    <div className="error">
                                        <span className="helper-text" data-error="wrong" data-success="right">{this.state.passwordError}</span>
                                    </div>
                                </div>
                                <div className="input-field">
                                    <input
                                        id="passwordTwice"
                                        type="password"
                                        name="passwordTwice"
                                        placeholder="Password again"
                                        value={this.state.passwordTwice}
                                        onChange={this.handlePasswordTwiceChange}
                                    />
                                    <div className="error">
                                        <span className="helper-text" data-error="wrong" data-success="right">{this.state.passwordTwiceError}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card-action">
                                <button id="signUpButton" onClick={this.signUp} className="btn-large" disabled={this.state.passwordError || this.state.usernameError || this.state.passwordTwiceError}>Sign up</button>
                            </div>
                        </div>
                    </form >
                </div>
            </div>
        );
    }
}

export default SignUp;
