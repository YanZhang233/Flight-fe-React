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
        const logout = <button className="logout" onClick={this.logout}>Log Out</button>;
        
        //if the user has not logged in
        if(!this.state.uid) {
            return (
                <div>
                    <Login login={this.login} />
                </div>
            );
        } else {
            //if the user is a student
            if(this.state.role === 0) {
                return (
                    <div>
                        {logout}
                        <Student 
                            studentId = {this.state.uid}
                        />
                    </div>
                );
            } else if(this.state.role === 2) {
                return (
                    <div>
                        {logout}
                        <Volunteer 
                            volunteerId = {this.state.uid}
                        />
                    </div>
                );
            } else {
                return <NotFound />;
            }
        }
    }
}

export default withRouter(App);