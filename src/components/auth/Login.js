import React from 'react';
import 'materialize-css';
import UsernameField from './UsernameField';
import PasswordField from './PasswordField';
import { authenticate } from '../../api/auth'

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

    onLogin = (e) => {
        e.preventDefault();
        let username = this.state.username.trim();
        let password = this.state.password.trim();
        authenticate(username, password).then(_response => {
            this.props.history.push("/todos");
        }).catch(_error => {
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
                                    <button onClick={this.onLogin} className="btn-large brown lighten-2 login-button">Login</button>
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
