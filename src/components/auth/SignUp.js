import React from 'react';
import apiUrl from '../../config';
import axios from 'axios';
import UsernameField from './UsernameField';
import PasswordField from './PasswordField';

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

    disabled = () => {
        return this.state.passwordError || this.state.usernameError || this.state.passwordTwiceError;
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
            .then(response => { // eslint-disable-line no-unused-vars
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
                    <div className="login">
                        <form className="col s4 offset-s4">
                            <div className="card">
                                <div className="card-content">
                                    <span className="card-title">Sign up</span>
                                    <UsernameField
                                        value={this.state.username}
                                        onChange={this.handleUsernameChange}
                                        error={this.state.usernameError} />
                                    <PasswordField
                                        value={this.state.password}
                                        onChange={this.handlePasswordChange}
                                        error={this.state.passwordError}
                                    />
                                    <PasswordField
                                        placeholder="Password again"
                                        value={this.state.passwordTwice}
                                        onChange={this.handlePasswordTwiceChange}
                                        error={this.state.passwordTwiceError}
                                    />
                                </div>
                                <div className="card-action">
                                    <button onClick={this.signUp} className="btn-large brown lighten-2 sign-up-button" disabled={this.disabled()}>
                                        Sign up
                                    </button>
                                </div>
                            </div>
                        </form >
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;
