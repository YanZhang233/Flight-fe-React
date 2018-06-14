import React from "react";
import UpdateStudentInfo from "./UpdateStudentInfo";
import axios from "../base.js";
import Qs from 'qs';

class StudentInfo extends React.Component {

    state = {
      studentInfo: null
    }

    componentWillMount() {
      this.getStudentInfo(this.props.studentId);
    }

    getStudentInfo = (userId) => {
        axios.get(`/user/${userId}`
        )
        .then(res => {
            //console.log(res.data);
            if(res.data.status === 0) {
                this.setState({ studentInfo: res.data.data });
            }
        })
    };

    updateStudentInfo = updatedInfo => {
        const { 
          wechat, 
          actualName, 
          gender, 
          graduatedFrom, 
          homeTown, 
          major
        } = updatedInfo;

        axios.patch(`/user`,
                Qs.stringify({ 
                    wechat, 
                    actualName, 
                    gender, 
                    graduatedFrom, 
                    homeTown, 
                    major
                }),
        )
        .then(res => {
            console.log(res.data);
            if(res.data.status === 0) {
                this.getStudentInfo(this.props.studentId);
                alert("Update your request success!");
            } else {
                alert(res.data.msg);
            }
        })
    };

    render() {
        if(this.state.studentInfo) {
          return (
              <div className="entry">
                <UpdateStudentInfo
                  default={this.state.studentInfo} 
                  updateStudentInfo={this.updateStudentInfo}
                  infoSwitch={this.props.infoSwitch}
                />
              </div>
          );
        } else {
          return <p>You Got No Information!!!</p>;
        }
    }
}

export default StudentInfo;
