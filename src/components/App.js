import React from "react";
import axios from "axios";
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

    authenticate = (userId, userRole) => {
        this.setState({ uid: userId, role: userRole });
    };

    logout = () => {
        axios.get(`/user/logout`
        )
        .then(res => {
            if(res.data.status === 0) {
                this.setState({ uid: null });
                alert("Log out success!");
            }
        })
    };

    render() {
        const logout = <button onClick={this.logout}>Log Out!</button>;

        //if the user has not logged in
        if(!this.state.uid) {
            return <Login authenticate={this.authenticate} />;
        }

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
        }

        //if the user is a volunteer
        if(this.state.role === 2) {
            return (
                <div>
                    <Volunteer 
                        volunteerId = {this.state.uid}
                    />
                    {logout}
                </div>
            );
        }

        return <NotFound />;

    }
}

export default App;