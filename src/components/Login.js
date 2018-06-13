import React from "react";
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
    emailRef = React.createRef();
    passRef = React.createRef();

    handleSubmit = event => {
        event.preventDefault();

        const email = this.emailRef.value.value;
        const password = this.passRef.value.value;

        this.props.login(email, password);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Log In</h2>
                <input
                    name="email"
                    type="email"
                    ref={this.emailRef}
                    placeholder="Email"
                />
                <input
                    name="password"
                    type="password"
                    ref={this.passRef}
                    placeholder="Password"
                />
                <button type="submit">Log In</button>
                <button onClick={() => {this.props.history.push(`/register`)}}>
                    Sign Up
                </button> 
            </form>
        );
    }
}

export default withRouter(Login);