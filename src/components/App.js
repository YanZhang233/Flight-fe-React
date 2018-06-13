import React from "react";
import axios from "../base.js";
import Qs from 'qs';
import cookie from "react-cookies";
import Login from "./Login";
import Student from "./Student";
import Volunteer from "./Volunteer";
import NotFound from "./NotFound";

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

    login = (userEmail, userPassword) => {
        axios.post(`/user`, 
                    Qs.stringify({ userEmail, userPassword })
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
            }
        })
    };

    render() {
        const logout = <button onClick={this.logout}>Log Out!</button>;

        //if the user has not logged in
        if(!this.state.uid) {
            return <Login login={this.login} />;
        } else {
            //if the user is a student
            if(this.state.role === 0) {
                return (
                    <div>
                        <Student 
                            studentId = {this.state.uid}
                        />
                        {logout}
                    </div>
                );
            } else if(this.state.role === 2) {
                return (
                    <div>
                        <Volunteer 
                            volunteerId = {this.state.uid}
                        />
                        {logout}
                    </div>
                );
            } else {
                return <NotFound />;
            }
        }
    }
}

export default App;