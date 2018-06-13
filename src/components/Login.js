import React from "react";
import axios from "../base.js";
import Qs from 'qs';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
    emailRef = React.createRef();
    passRef = React.createRef();

    handleSubmit = event => {
        event.preventDefault();

        const email = this.emailRef.value.value;
        const password = this.passRef.value.value;
         
        axios.post(`/user`, 
                    Qs.stringify({ email, password })
            )
            .then(res => {
                if(res.data.status === 0) {
                    const userId = res.data.data.id;
                    const userRole = res.data.data.role;
                    this.props.authenticate(userId, userRole);
                } else {
                    alert("Password Wrong!");
                }
            })
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