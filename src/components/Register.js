import React from "react";
import axios from "axios";
import Qs from 'qs';

class Register extends React.Component {
    emailRef = React.createRef();
    wechatRef = React.createRef();
    roleRef = React.createRef();
    passRef = React.createRef();

    handleSubmit = event => {
        event.preventDefault();

        const email = this.emailRef.value.value;
        const wechat = this.wechatRef.value.value;
        const role = this.roleRef.value.value;
        const password = this.passRef.value.value;

        if(role === `student`) {
            axios.post(`http://localhost:8080/user/new`, 
                    Qs.stringify({ email, wechat, password }),
                )
                .then(res => {
                    if(res.data.status === 0) {
                        alert("Sign up successfully as a new student!");
                        this.props.history.push(`/`);
                    } else {
                        alert("This Email has been used!");
                    }
                })
        } else if(role === `volunteer`) {
            axios.post(`http://localhost:8080/user/volunteer`, 
                    Qs.stringify({ email, wechat, password }),
                )
                .then(res => {
                    if(res.data.status === 0) {
                        alert("Sign up successfully as a volunteer!");
                        this.props.history.push(`/`);
                    } else {
                        alert("Only support Edu Email!");
                    }
                })
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Sign Up</h2>
                <input
                    name="email"
                    type="email"
                    ref={this.emailRef}
                    placeholder="Email"
                />
                <input
                    name="wechat"
                    type="text"
                    ref={this.wechatRef}
                    placeholder="Wechat"
                />
                <select name="role" ref={this.roleRef}>
                    <option value="student">I am student</option>
                    <option value="volunteer">I am volunteer</option>
                </select>
                <input
                    name="password"
                    type="password"
                    ref={this.passRef}
                    placeholder="Password"
                />
                <button type="submit">Sign Up</button>
                <button onClick={() => {this.props.history.push(`/`)}}>
                    Log In
                </button>
            </form>
        );
    }
}

export default Register;