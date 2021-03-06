import React from 'react';
import UsernameField from './UsernameField';
import PasswordField from './PasswordField';
import { register } from '../../api/auth'

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

    canSignUp = () => {
        return this.state.passwordError || this.state.usernameError || this.state.passwordTwiceError;
    }

    handleUsernameChange = (e) => {
        let newUsername = e.target.value;
        this.setState({ username: newUsername });
        if (newUsername.length < 6) {
            this.setState({ usernameError: 'Username must be 6 chars min' })
        } else {
            this.setState({ usernameError: '' })
        }
    }

    handlePasswordChange = (e) => {
        let newPassword = e.target.value;
        this.setState({ password: newPassword });
        if (newPassword.length < 6) {
            this.setState({ passwordError: 'Password must be 6 chars min' });
        } else {
            this.setState({ passwordError: '' });
        }
    }

    handlePasswordTwiceChange = (e) => {
        this.setState({ passwordTwice: e.target.value });
        if (this.state.password !== e.target.value) {
            this.setState({ passwordTwiceError: 'Passwords should match' });
        } else {
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
        register(username, password).then(_response => {
            this.props.history.push("/login");
        })
            .catch(error => {
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
                                    <button onClick={this.signUp} className="btn-large brown lighten-2 sign-up-button" disabled={this.canSignUp()}>
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
