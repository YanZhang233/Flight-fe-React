import React from "react";
import { withRouter } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

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
                            <a className="back" onClick={() => {this.props.history.push(`/intro`)}}>
                                Back
                            </a>
                        </form>

                    </div>

                </div>




            </ReactCSSTransitionGroup>
        );
    }
}

export default withRouter(Login);