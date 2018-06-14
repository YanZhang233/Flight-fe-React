import React from "react";
import axios from "../base.js";
import Qs from 'qs';
import { withRouter } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class Register extends React.Component {
    emailRef = React.createRef();
    wechatRef = React.createRef();
    roleRef = React.createRef();
    passRef = React.createRef();

    graduatedFromRef = React.createRef();
    genderRef = React.createRef();
    homeTownRef = React.createRef();
    majorRef = React.createRef();
    actualNameRef = React.createRef();

    handleSubmit = event => {
        event.preventDefault();

        const email = this.emailRef.value.value;
        const wechat = this.wechatRef.value.value;
        const role = this.roleRef.value.value;
        const password = this.passRef.value.value;

        const graduatedFrom = this.graduatedFromRef.value.value;
        const gender = this.genderRef.value.value;
        const homeTown = this.homeTownRef.value.value;
        const major = this.majorRef.value.value;
        const actualName = this.actualNameRef.value.value;

        if(role === `student`) {
            axios.post(`/user/new`, 
                    Qs.stringify({ 
                        email, 
                        wechat, 
                        password, 
                        graduatedFrom, 
                        gender,
                        homeTown,
                        major, 
                        actualName
                    }),
                )
                .then(res => {
                    if(res.data.status === 0) {
                        alert("Sign up successfully as a new student!");
                        this.props.history.push(`/`);
                    } else {
                        alert(res.data.msg);
                    }
                })
        } else if(role === `volunteer`) {
            axios.post(`/user/volunteer`, 
                    Qs.stringify({ 
                        email, 
                        wechat, 
                        password, 
                        graduatedFrom, 
                        gender,
                        homeTown,
                        major, 
                        actualName
                    }),
                )
                .then(res => {
                    if(res.data.status === 0) {
                        alert("Sign up successfully as a volunteer!");
                        this.props.history.push(`/`);
                    } else {
                        alert(res.data.msg);
                    }
                })
        }
    }

    render() {
        return (
            <ReactCSSTransitionGroup
                transitionName="AppearTransition"
                transitionAppear={ true }
                transitionAppearTimeout={ 1000 }
                transitionEnter={ false }
                transitionLeave={ false }
            >
                <form className="entry" onSubmit={this.handleSubmit}>
                    <h2 className="entry-title">Sign Up</h2>
                    <input
                        name="email"
                        type="email"
                        ref={this.emailRef}
                        placeholder="Email*"
                    />
                    <input
                        name="wechat"
                        type="text"
                        ref={this.wechatRef}
                        placeholder="Wechat*"
                    />
                    <select name="role" ref={this.roleRef}>
                        <option value="student">I am student</option>
                        <option value="volunteer">I am volunteer</option>
                    </select>
                    <input
                        name="graduatedFrom"
                        type="text"
                        ref={this.graduatedFromRef}
                        placeholder="Graduated From"
                    />
                    <select name="gender" ref={this.genderRef}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <input
                        name="homeTown"
                        type="text"
                        ref={this.homeTownRef}
                        placeholder="Hometown"
                    />
                    <input
                        name="major"
                        type="text"
                        ref={this.majorRef}
                        placeholder="Major"
                    />
                    <input
                        name="actualName"
                        type="text"
                        ref={this.actualNameRef}
                        placeholder="Actual Name"
                    />
                    <input
                        name="password"
                        type="password"
                        ref={this.passRef}
                        placeholder="Password*"
                    />
                    <button type="submit">Sign Up</button>
                    <button onClick={() => {this.props.history.push(`/flight`)}}>
                        Log In
                    </button>
                    <button onClick={() => {this.props.history.push(`/`)}}>
                        Back
                    </button> 
                </form>
            </ReactCSSTransitionGroup>
        );
    }
}

export default withRouter(Register);