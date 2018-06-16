import React from "react";
import axios from "../base.js";
import Qs from 'qs';
import { withRouter } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class Register extends React.Component {

    state = {
        student: true
    }

    emailRef = React.createRef();
    wechatRef = React.createRef();
    roleRef = React.createRef();
    passRef = React.createRef();

    graduatedFromRef = React.createRef();
    genderRef = React.createRef();
    homeTownRef = React.createRef();
    majorRef = React.createRef();
    actualNameRef = React.createRef();

    handleChange = event => {
        const ifStudent = !this.state.student
        this.setState({ student: ifStudent });
    };

    handleSubmit = event => {
        event.preventDefault();

        const email = this.emailRef.value.value;
        const wechat = this.wechatRef.value.value;
        const role = this.roleRef.value.value;
        const password = this.passRef.value.value;



        if(role === `student`) {
            const graduatedFrom = this.graduatedFromRef.value.value;
            const gender = this.genderRef.value.value === "Male"? 1 : 0;
            const homeTown = this.homeTownRef.value.value;
            const major = this.majorRef.value.value;
            const actualName = this.actualNameRef.value.value;
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

                <div className="container">
                    <div className="row">
                        <div className="formDiv">
                            <h2 className="formHeader">Sign Up</h2>
                            <form  onSubmit={this.handleSubmit}>

                                <div className="form-group">
                                    <label htmlFor="role">Select want to help if you are a senior student</label>
                                    <select className="form-control" id="role" name="role" ref={this.roleRef} onChange={this.handleChange} defaultValue="student">
                                        <option value="student">I need pick-up help</option>
                                        <option value="volunteer">I want to help new students</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        name="email"
                                        type="email"
                                        ref={this.emailRef}
                                        placeholder="Email*"
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        name="wechat"
                                        type="text"
                                        ref={this.wechatRef}
                                        placeholder="Wechat*"
                                    />
                                </div>

                                {this.state.student?
                                    <React.Fragment>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                name="graduatedFrom"
                                                type="text"
                                                ref={this.graduatedFromRef}
                                                placeholder="Graduated From"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <select className="form-control" name="gender" ref={this.genderRef}>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                name="homeTown"
                                                type="text"
                                                ref={this.homeTownRef}
                                                placeholder="Hometown"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                name="major"
                                                type="text"
                                                ref={this.majorRef}
                                                placeholder="Major"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                name="actualName"
                                                type="text"
                                                ref={this.actualNameRef}
                                                placeholder="Actual Name"
                                            />
                                        </div>

                                    </React.Fragment>
                                    :
                                    ""
                                }
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        name="password"
                                        type="password"
                                        ref={this.passRef}
                                        placeholder="Password*"
                                    />
                                </div>

                                <button className="btn btn-primary btn-block" type="submit">Sign Up</button>

                                <button className="btn btn-primary btn-block"  onClick={() => {this.props.history.push(`/`)}}>
                                    Log In
                                </button>
                                <br/>
                                <a className="back" onClick={() => {this.props.history.push(`/intro`)}}>
                                    Back
                                </a>
                            </form>
                        </div>


                    </div>

                </div>

            </ReactCSSTransitionGroup>
        );
    }
}

export default withRouter(Register);