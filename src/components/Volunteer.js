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
        const location = (this.locationRef.value.value).trim();
        console.log(location);
        if(location !== "") {
            axios.get(`/flight/location?location=${location}`
            )
            .then(res => {
                if(res.data.status === 0) {
                    this.setState({ requests: res.data.data.content });
                    this.setState({ currentPage: res.data.data.number });
                    this.setState({ totalPages: res.data.data.totalPages });
                }
                console.log(this.state.requests);
            })
        } else {
            this.getRequests(0);
        }
    }

    sendInterest = (requestId) => {
        axios.patch(`/flight/${requestId}`
        )
        .then(res => {
            if(res.data.status === 0) {
                this.getRequests();
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
                    <div className="container">
                        <div className="row head-con">
                            <div className="col-xs-3 search-title-con">
                                <h3 id="position-con"><i className="fas fa-map-marker-alt"></i></h3>
                            </div>
                            <div className="col-xs-5 search-input-con">
                                <input 
                                    className="search-input" 
                                    id="search-input" 
                                    name="location"
                                    ref={this.locationRef}
                                    type="text"
                                />
                            </div>
                            <div className="col-xs-4 search-btn-con">
                                <button id="search-btn" onClick={this.searchRequests}>Search</button>
                            </div>
                        </div>

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
                            {this.state.totalPages < 2?
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