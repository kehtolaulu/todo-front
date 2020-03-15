import React from 'react';

class Login extends React.Component {
    render() {
        return(
            <div id="login-form">
                <input type="text" name="username" placeholder="Username"></input>
                <br></br>
                <input type="password" name="password" placeholder="Password"></input>
                <br></br>
                <button id="loginButton">Login</button>
            </div>
        );
    }
}

export default Login;