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
                <form className="entry" onSubmit={this.handleSubmit}>
                    <h2 className="entry-title">Log In</h2>
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
                    <button onClick={() => {this.props.history.push(`/intro`)}}>
                        Back
                    </button> 
                </form>
            </ReactCSSTransitionGroup>
        );
    }
}

export default withRouter(Login);