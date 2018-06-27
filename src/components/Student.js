import React from "react";
import StudentInfo from "./StudentInfo";
import Display from "./Display";
import AddRequest from "./AddRequest";
import axios from "../base.js";
import Qs from 'qs';
import { Alert } from "react-bootstrap";

class Student extends React.Component {

    state = {
        stuId: null,
        requestInfo: null,
        alertMsg: null
    }

    componentWillMount() {
        // this.state.stuId = null
        this.setState({ stuId: this.props.studentId });
        this.findRequest();
    }

    findRequest = () => {
        axios.get(`/flight/user`
        )
        .then(res => {
            console.log(res.data);
            if(res.data.status === 0) {
                this.setState({ requestInfo: res.data.data });
            }
        })
    };

    addRequest = newRequest => {

        const { airport, destination, time, flightInfo, description, numOfPeople, baggage} = newRequest;

        axios.post(`/flight`, 
                Qs.stringify({ 
                    airport, 
                    destination,
                    time,
                    flightInfo,
                    description,
                    numOfPeople,
                    baggage
                }),
        )
        .then(res => {
            console.log(res.data);
            if(res.data.status === 0) {
                this.findRequest();
                //alert("Add your request success!");
                this.setState({ alertMsg: null });
            } else {
                this.setState({ alertMsg: res.data.msg });
            }
        })
    }

    updateRequest = updatedRequest => {
        const { airport, destination, time, flightInfo, description, numOfPeople, baggage} = updatedRequest;

        axios.patch(`/flight/modify`,
                Qs.stringify({ 
                    airport, 
                    destination,
                    time,
                    flightInfo,
                    description,
                    numOfPeople,
                    baggage
                }),
        )
        .then(res => {
            console.log(res.data);
            if(res.data.status === 0) {
                this.findRequest();
                //alert("Update your request success!");
                this.setState({ alertMsg: null });
            } else {
                this.setState({ alertMsg: res.data.msg });
            }
        })
    };

    deleteRequest = () => {
        const cancel = window.confirm("Are you sure to cancel your request?");
        if(cancel) {
            axios.delete(`/flight/${this.state.requestInfo.request.id}`
              )
              .then(res => {
                  if(res.data.status === 0) {
                    this.setState({ requestInfo: null });
                    //alert("Cancel your request success!");
                    this.setState({ alertMsg: null });
                  } else {
                    this.setState({ alertMsg: res.data.msg });
                  }
              })
        }
    };

    render() {
        
        if(this.props.goToPerson) {
            return (
                <StudentInfo
                    studentId={this.props.studentId} 
                    infoSwitch={this.props.infoSwitch}
                />
            );
        } else {
            //if the student has a request
            if(this.state.requestInfo) {
                return (
                    <div>
                        {this.state.alertMsg === null?
                            "":
                            <Alert bsStyle="danger">
                              {this.state.alertMsg}
                            </Alert>
                        }
                        <Display
                            requestInfo={this.state.requestInfo}
                            updateRequest={this.updateRequest}
                            deleteRequest={this.deleteRequest}
                        />
                    </div>
                );
            }
            return (
                <div>
                    <div className="display-info">
                        {this.state.alertMsg === null?
                            "":
                            <Alert bsStyle="danger">
                              {this.state.alertMsg}
                            </Alert>
                        }
                        <h2 className="info-title">Waiting for pick-up...😁</h2>
                        <AddRequest 
                            addRequest={this.addRequest}
                        />
                    </div>
                </div>
            );
        }
        
    }
}

export default Student;