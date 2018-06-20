import React from "react";
import axios from "../base.js";
import Qs from 'qs';
import { withRouter } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class Login extends React.Component {
    emailRef = React.createRef();
    passRef = React.createRef();

    handleSubmit = event => {
        event.preventDefault();

        const email = this.emailRef.value.value;
        const password = this.passRef.value.value;

        this.login(email, password);
    }

    login = (email, password) => {
        axios.post(`/user`, 
                    Qs.stringify({ email, password })
            )
            .then(res => {
                if(res.data.status === 0) {
                    const userId = res.data.data.id;
                    const userRole = res.data.data.role;
                    this.props.history.push(`/`)
                } else {
                    alert(res.data.msg);
                }
            })
    };

    render() {
        return (
            <ReactCSSTransitionGroup
                transitionName="AppearTransition"
                transitionAppear={ true }
                transitionAppearTimeout={ 1000 }
                transitionEnter={ false }
                transitionLeave={ false }
            >

                <div className="container">
                    <div className="formDiv">
                        <h3 className="formHeader">LogIn</h3>
                        <form  onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input className="form-control"
                                    name="email"
                                    type="email"
                                    ref={this.emailRef}
                                    placeholder="Email"
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    className="form-control"
                                    name="password"
                                    type="password"
                                    ref={this.passRef}
                                    placeholder="Password"
                                />
                            </div>

                            <button className="btn btn-primary btn-block" type="submit">Log In</button>

                            <button  className="btn btn-primary btn-block" onClick={() => {this.props.history.push(`/register`)}}>
                                Sign Up
                            </button>
                            <br/>
                            <a className="back" onClick={() => {this.props.history.push(`/`)}}>
                                Back
                            </a>
                        </form>

                    </div>

                </div>

                <p className="copyright">
                    2018©FoggyStudio
                </p>

            </ReactCSSTransitionGroup>
        );
    }
}

export default withRouter(Login);