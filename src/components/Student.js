import React from "react";
import Display from "./Display";
import AddRequest from "./AddRequest";
import axios from "../base.js";
import Qs from 'qs';

class Student extends React.Component {

    state = {
        stuId: null,
        requestInfo: null,
    }

    componentWillMount() {
        this.setState({ stuId: this.props.studentId });
        this.findRequest();
    }

    findRequest = () => {
        axios.get(`/flight/user`
        )
        .then(res => {
            if(res.data.status === 0) {
                this.setState({ requestInfo: res.data.data });
            }
        })
    };

    addRequest = request => {

        const { airport, destination, time, flightInfo, description, numOfPeople, baggage} = request;

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
                alert("Add your request success!");
            }
        })
    }

    updateRequest = () => {
        this.findRequest();
        alert("update your request success!");
    };

    deleteRequest = () => {
        axios.delete(`/flight/${this.state.requestInfo.request.id}`
          )
          .then(res => {
              if(res.data.status === 0) {
                this.setState({ requestInfo: null });
                alert("Cancel your request success!");
              }
          })
    };

    render() {
        //if the student has a request
        if(this.state.requestInfo) {
            return (
                <Display
                    requestInfo={this.state.requestInfo}
                    updateRequest={this.updateRequest}
                    deleteRequest={this.deleteRequest}
                />
            );
        }
        return (
            <div className="inventory">
                <h2>Waiting for pick-up</h2>
                <AddRequest 
                    addRequest={this.addRequest}
                />
            </div>
        );
        
    }
}

export default Student;