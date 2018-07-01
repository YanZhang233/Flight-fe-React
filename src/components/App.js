import React from "react";
import axios from "../base.js";
import Qs from 'qs';
import cookie from "react-cookies";
import Intro from "./Intro";
import Login from "./Login";
import Student from "./Student";
import Volunteer from "./Volunteer";
import NotFound from "./NotFound";
import { withRouter } from "react-router-dom";
import { Alert } from "react-bootstrap";

class App extends React.Component {

    //decide whether is {student} or {volunteer}

    state = {
        uid: null,
        role: null,
        goToPerson: false,
        alertStatus: null,
        alertMsg: null
    }

    componentWillMount() {
        const email = localStorage.getItem('Email');
        const password = localStorage.getItem('Password');
        if(email !== null && password !== null) {
            this.login(email, password);
        } else {
            this.loginWithCookie();
        }
    }

    loginWithCookie = () => {
        axios.post(`/user`
            )
            .then(res => {
                console.log(res.data);
                if(res.data.status === 0) {
                    const userId = res.data.data.id;
                    const userRole = res.data.data.role;
                    this.setState({ uid: userId, role: userRole });
                }
            })
    }

    login = (email, password) => {
        axios.post(`/user`, 
                    Qs.stringify({ email, password })
            )
            .then(res => {
                if(res.data.status === 0) {
                    const userId = res.data.data.id;
                    const userRole = res.data.data.role;
                    this.setState({ uid: userId, role: userRole });
                } else {
                    alert(res.data.msg);
                }
            })
    };

    logout = () => {
        axios.get(`/user/logout`
        )
        .then(res => {
            if(res.data.status === 0) {
                this.setState({ uid: null, role: null });
                cookie.remove('flightGWU_email', { path: '/' });
                cookie.remove('flightGWU_pass', { path: '/' });
                cookie.remove('JSESSIONID', { path: '/' });
                localStorage.clear();
                //alert("Log out success!");
            } else {
                alert(res.data.msg);
            }
        })
    };

    activeEmail = () => {
        axios.get(`/user/email/${this.state.uid}`
        )
        .then(res => {
            console.log(res.data);
            if(res.data.status === 0) {
                this.handleAlert(true, res.data.msg + ` and log in again`);
            } else {
                this.handleAlert(false, res.data.msg);
            }
        })
    }

    infoSwitch = () => {
        const ifGoToPerson = !this.state.goToPerson;
        this.setState({ goToPerson: ifGoToPerson });
    }

    handleAlert = (status, msg) => {
        this.setState({ alertStatus: status, alertMsg: msg });
    }

    render() {

        //if the user has not logged in
        if(!this.state.uid) {
            return (  
                <Intro />
            );
        } else {
            //if the user is a student
            if(this.state.role === 0) {
                return (
                    <React.Fragment>
                        <nav className="navbar navbar-default fixed-top ">
                            <div className="container-fluid">
                                <div className="navbar-header">
                                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                            data-target="#collapsebar" aria-expanded="false">
                                        <span className="sr-only">Toggle navigation</span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                    </button>
                                    <a className="navbar-brand" href="/">Flight <i className="fas fa-plane"></i></a>

                                </div>
                                <div className="collapse navbar-collapse" id="collapsebar">
                                    <ul className="nav navbar-nav navbar-right">
                                        <li><a onClick={this.infoSwitch}>
                                            {this.state.goToPerson?"RequestInfo":"PersonalInfo"}                    
                                        <i className="fas fa-user"></i></a></li>
                                        <li><a onClick={this.logout}>Logout <i className="fas fa-sign-out-alt"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                        <Student 
                            studentId = {this.state.uid}
                            goToPerson = {this.state.goToPerson}
                            infoSwitch = {this.infoSwitch}
                        />
                        <p onClick={() => window.open("https://foggystudio.com")} className="copyright">
                            2018©FoggyStudio
                        </p>
                    </React.Fragment>
                );
            } else if(this.state.role === 2) {
                return (
                    <React.Fragment>
                        <nav className="navbar navbar-default fixed-top ">
                            <div className="container-fluid">
                                <div className="navbar-header">
                                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                            data-target="#collapsebar" aria-expanded="false">
                                        <span className="sr-only">Toggle navigation</span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                    </button>
                                    <a className="navbar-brand" href="/">Flight <i className="fas fa-plane"></i></a>

                                </div>
                                <div className="collapse navbar-collapse" id="collapsebar">
                                    <ul className="nav navbar-nav navbar-right">
                                        <li><a onClick={this.activeEmail}>ActivateEmail <i className="fas fa-envelope"></i></a></li>
                                        <li><a onClick={this.logout}>Logout <i className="fas fa-sign-out-alt"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </nav>

                        {this.state.alertMsg === null?
                            "":
                            <div className="row showAlert">
                                <Alert bsStyle={this.state.alertStatus === true? `success`:`danger`}>
                                  {this.state.alertMsg}
                                </Alert>
                            </div>
                        }

                        <Volunteer 
                            volunteerId = {this.state.uid}
                            handleAlert = {this.handleAlert}
                        />

                        <p onClick={() => window.open("https://foggystudio.com")} className="copyright">
                            2018©FoggyStudio
                        </p>
                    </React.Fragment>
                );
            } else {
                return <NotFound />;
            }
        }
    }
}

export default withRouter(App);