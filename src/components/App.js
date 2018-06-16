import React from "react";
import axios from "../base.js";
import Qs from 'qs';
import cookie from "react-cookies";
import Login from "./Login";
import Student from "./Student";
import Volunteer from "./Volunteer";
import NotFound from "./NotFound";
import { withRouter } from "react-router-dom";

class App extends React.Component {

    //decide whether is {student} or {volunteer}

    state = {
        uid: null,
        role: null
    }

    componentWillMount() {
        this.loginWithCookie();
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
                this.setState({ uid: null });
                cookie.remove('flightGWU_email', { path: '/' });
                cookie.remove('flightGWU_pass', { path: '/' });
                cookie.remove('JSESSIONID', { path: '/' });
                alert("Log out success!");
                this.props.history.push(`/intro`);
            } else {
                alert(res.data.msg);
            }
        })
    };

    render() {

        
        //if the user has not logged in
        if(!this.state.uid) {
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
                                    <li><a href="/" >Login <i className="fas fa-sign-in-alt"></i></a></li>
                                    <li><a href="/register">Signup <i className="fas fa-user-plus"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                    <Login login={this.login}/>

                </React.Fragment>

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
                                        <li><a href="#" >PersonalInfo <i className="fas fa-user"></i></a></li>
                                        <li><a href="#" onClick={this.logout}>Logout <i className="fas fa-sign-out-alt"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                        <Student 
                            studentId = {this.state.uid}
                        />
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
                                        <li><a href="#" >PersonalInfo <i className="fas fa-user"></i></a></li>
                                        <li><a href="#" onClick={this.logout}>Logout <i className="fas fa-sign-out-alt"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </nav>

                        <Volunteer 
                            volunteerId = {this.state.uid}
                        />
                    </React.Fragment>
                );
            } else {
                return <NotFound />;
            }
        }
    }
}

export default withRouter(App);