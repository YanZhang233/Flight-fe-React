import React from "react";
import UpdateStudentInfo from "./UpdateStudentInfo";
import axios from "../base.js";
import Qs from 'qs';
import { Alert } from "react-bootstrap";

class StudentInfo extends React.Component {

    state = {
      studentInfo: null,
      alertStatus: null,
      alertMsg: null
    }

    componentWillMount() {
      this.getStudentInfo(this.props.studentId);
    }

    getStudentInfo = (userId) => {
        axios.get(`/user/${userId}`
        )
        .then(res => {
            console.log(res.data);
            if(res.data.status === 0) {
                this.setState({ studentInfo: res.data.data });
            }
        })
    };

    updateStudentInfo = (updatedInfo, avatar) => {
        const { 
          wechat, 
          gender,
          actualName, 
          graduatedFrom, 
          homeTown, 
          major
        } = updatedInfo;

        axios.patch(`/user`,
                Qs.stringify({ 
                    wechat, 
                    gender,
                    actualName, 
                    graduatedFrom, 
                    homeTown, 
                    major,
                    avatar
                }),
        )
        .then(res => {
            console.log(res.data);
            if(res.data.status === 0) {
                this.setState({ studentInfo: res.data.data });
                this.setState({ alertStatus: true, alertMsg: "Update your information success!" });
                //this.props.infoSwitch();
            } else {
                this.setState({ alertStatus: false, alertMsg: res.data.msg });
            }
        })
    };

    render() {
        if(this.state.studentInfo) {
          return (
              <div>

                {this.state.alertMsg === null?
                    "":
                    <Alert className="alert" bsStyle={this.state.alertStatus === true? `success`:`danger`}>
                      {this.state.alertMsg}
                    </Alert>
                }
            
                <div className="entry">
                  <UpdateStudentInfo
                    default={this.state.studentInfo} 
                    updateStudentInfo={this.updateStudentInfo}
                    infoSwitch={this.props.infoSwitch}
                  />
                </div>
              </div>
          );
        } else {
          return <p>Loading...</p>;
        }
    }
}

export default StudentInfo;
