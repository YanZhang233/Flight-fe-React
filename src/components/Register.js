import React from "react";
import axios from "../base.js";
import Qs from 'qs';
import { withRouter } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Dropzone from 'react-dropzone';
import { Alert } from "react-bootstrap";

class Register extends React.Component {

    state = {
        student: true,
        avatarFile: [],
        avatarPreview: null,
        avatar: null,
        alertMsg: null
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

        const role = this.roleRef.value.value;


        if(role === `student`) {
            if(this.state.avatarFile && this.state.avatarFile.length > 0) {
                this.uploadHandler(this.state.avatarFile[0]);
            } else {
                this.handleStudentSubmit();
            }

        } else if(role === `volunteer`) {
            const email = this.emailRef.value.value;
            const wechat = this.wechatRef.value.value;
            const password = this.passRef.value.value;

            axios.post(`/user/volunteer`,
                Qs.stringify({
                    email,
                    wechat,
                    password,
                }),
            )
                .then(res => {
                    console.log(res.data);
                    if(res.data.status === 0) {
                        alert("Please go to your Email to activate your account!");
                        localStorage.setItem('Email', email);
                        localStorage.setItem('Password', password);
                        this.props.history.push(`/`);
                    } else {
                        this.setState({ alertMsg: res.data.msg });
                    }
                })
        }
    }

    handleDrop = (dropped) => {
        //console.log(dropped[0]);
        this.setState({ avatarFile: dropped, avatarPreview: dropped[0].preview });
    }

    uploadHandler = (image) => {
        console.log(image);
        const formData = new FormData();
        formData.append('upload_file', image);
        axios.post(`/user/avatar`, formData
        )
        .then(res => {
            console.log(res.data);
            if(res.data.status === 0) {
                this.setState({ avatar: res.data.data.url }, this.handleStudentSubmit);
            } else {
                this.setState({ alertMsg: res.data.msg });
            }    
        })
    }

    handleStudentSubmit = () => {

        console.log(this.state.avatar);

        const email = this.emailRef.value.value;
        const wechat = this.wechatRef.value.value;
        const password = this.passRef.value.value;
        const graduatedFrom = this.graduatedFromRef.value.value;
        const gender = this.genderRef.value.value;
        const homeTown = this.homeTownRef.value.value;
        const major = this.majorRef.value.value;
        const actualName = this.actualNameRef.value.value;
        const avatar = this.state.avatar;
        axios.post(`/user/new`, 
            Qs.stringify({
                email,
                wechat,
                password,
                graduatedFrom,
                gender,
                homeTown,
                major,
                actualName,
                avatar
            })
        )
            .then(res => {
                if(res.data.status === 0) {
                    //alert("Sign up successfully as a new student!");
                    localStorage.setItem('Email', email);
                    localStorage.setItem('Password', password);
                    this.props.history.push(`/`);
                } else {
                    this.setState({ alertMsg: res.data.msg });
                }
            })

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
                    {this.state.alertMsg === null?
                        "":
                        <div className="row showAlert">
                            <Alert bsStyle="danger">
                              {this.state.alertMsg}
                            </Alert>
                        </div>
                    }
                    
                    <div className="row">

                    {this.state.student?

                        <div className="col-xs-12 col-md-3">
                            <div className="col-md-12" id="thumContainer">
                                <div id="infoAvatar">
                                    <Dropzone
                                        id="register-dropzone"
                                        accept="image/jpeg, image/png"
                                        onDrop={this.handleDrop}           
                                    >
                                        {this.state.avatarPreview?
                                            <img 
                                                className="img-responsive img-size"
                                                src={this.state.avatarPreview} 
                                            />
                                            :
                                            <i className="fas fa-plus fa-5x" id="plus-icon"></i>
                                        }
                                    </Dropzone>
                                </div>
                            </div>
                        </div>
                    :""
                    }

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
                                        required
                                        className="form-control"
                                        name="email"
                                        type="email"
                                        ref={this.emailRef}
                                        placeholder="Email*"
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        required
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
                                                <option value="1">Male</option>
                                                <option value="0">Female</option>
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
                                        required
                                        className="form-control"
                                        name="password"
                                        type="password"
                                        ref={this.passRef}
                                        placeholder="Password*"
                                    />
                                </div>

                                <button className="btn btn-primary btn-block" type="submit">Sign Up</button>

                                <button className="btn btn-primary btn-block"  onClick={() => {this.props.history.push(`/login`)}}>
                                    Log In
                                </button>
                                <br/>
                                <a className="back" onClick={() => {this.props.history.push(`/`)}}>
                                    Back
                                </a>
                            </form>
                        </div>


                    </div>

                </div>
                
                <p onClick={() => window.open("https://foggystudio.com")} className="copyright">
                    2018©FoggyStudio
                </p>

            </ReactCSSTransitionGroup>
        );
    }
}

export default withRouter(Register);