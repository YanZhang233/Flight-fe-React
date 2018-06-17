import React from "react";
import axios from "../base.js";
import StudentInRequest from "./StudentInRequest";
import Request from "./Request";
import Pagination from "./Pagination";

class Volunteer extends React.Component {

    locationRef = React.createRef();

    state = {
        volId: null,
        requests: [],
        requestStudentId: null,
        currentPage: 0,
        totalPages: null
    }

    componentWillMount() {
        this.setState({ volId: this.props.volunteerId });
        if(this.state.requests.length <= 0) {
            this.getRequests(0);
        }
    }

    handlePagination = (pageIndex) => {
        this.getRequests(pageIndex);
    }

    getRequests = (pageIndex) => {
        pageIndex = typeof pageIndex !== "undefined" ? pageIndex : this.state.currentPage;
        axios.get(`/flight/?pageIndex=${pageIndex}`
        )
        .then(res => {
            console.log(res.data);
            if(res.data.status === 0) {
                this.setState({ requests: res.data.data.content });
                this.setState({ currentPage: res.data.data.number });
                this.setState({ totalPages: res.data.data.totalPages });
            }
            console.log(this.state.requests);
        })
    }

    searchRequests = () => {
        const location = this.locationRef.value.value;
        axios.get(`/flight/?location=${location}`
        )
        .then(res => {
            //console.log(res.data);
        })
    }

    sendInterest = (requestId) => {
        axios.patch(`/flight/${requestId}`
        )
        .then(res => {
            if(res.data.status === 0) {
                this.getRequests();
                alert("Your interest has been sent to the new student!");
            } else {
                alert(res.data.msg);
            }
        })
    }

    removeInterest = (requestId) => {
        axios.delete(`/flight/like/${requestId}`
          )
          .then(res => {
              if(res.data.status === 0) {
                this.getRequests();
              } else {
                alert(res.data.msg);
              }
          })
    }

    checkStudent = (requestUserId) => {
        this.setState({ requestStudentId: requestUserId });
    }

    render() {

        if(this.state.requestStudentId) {
            return (
                <StudentInRequest 
                    studentId={this.state.requestStudentId}
                    checkStudent={this.checkStudent}
                />
            );
        } else {

            return (
                <React.Fragment>
                    <input
                      name="location"
                      ref={this.locationRef}
                      type="text"
                    />
                    <button onClick={this.searchRequests}>search</button>
                    <div className="container">
                        <div className="row showRequests" >
                            {Object.keys(this.state.requests).map(key => (
                                <Request
                                    key={key}
                                    details={this.state.requests[key]}
                                    sendInterest={this.sendInterest}
                                    removeInterest={this.removeInterest}
                                    checkStudent={this.checkStudent}
                                />
                            ))}
                        </div>
                        <div className="row paginationContainer">
                            {this.state.totalPages === 1?
                                ""
                                :
                                <Pagination
                                    currentPage={this.state.currentPage}
                                    totalPages={this.state.totalPages}
                                    handlePagination={this.handlePagination}
                                />
                            }
                        </div>

                    </div>
                </React.Fragment>
            );
        }
    }
}

export default Volunteer;