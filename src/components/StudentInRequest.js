import React from "react";
import axios from "../base.js";

class StudentInRequest extends React.Component {

    state = {
        studentInfo: null
    }

    componentWillMount() {
        this.getStudentInfo(this.props.studentId);
    }

    getStudentInfo = (studentId) => {
        axios.get(`/user/${studentId}`
        )
        .then(res => {
            console.log(res.data);
            if(res.data.status === 0) {
                this.setState({ studentInfo: res.data.data });
            } else {
                alert(res.data.msg);
            }
        })
    };

    render() {
        if(this.state.studentInfo) {
            const { 
              email,
              wechat, 
              actualName, 
              gender, 
              graduatedFrom, 
              homeTown, 
              major
            } = this.state.studentInfo;

            return (
              <li className="display-info">
                <p className="info-title">This student is waiting for pick-up...</p>
                <p>Email: {email}</p>
                <p>Wechat: {wechat}</p>
                <p>Actual Name: {actualName}</p>
                <p>Gender: {gender}</p>
                <p>Graduated From: {graduatedFrom}</p>
                <p>Hometown: {homeTown}</p>
                <p>Major: {major}</p>
                <button onClick={() => this.props.checkStudent(null)}>Back</button>
              </li>
            );
        } else {
            return <p>No Information!!!</p>;
        }
    }
}

export default StudentInRequest;