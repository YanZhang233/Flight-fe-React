import React from "react";
import axios from "../base.js";
import Request from "./Request";

class Volunteer extends React.Component {

    state = {
        volId: null,
        requests: []
    }

    componentWillMount() {
        this.setState({ volId: this.props.volunteerId });
        this.getRequests();
    }

    getRequests = () => {
        axios.get(`/flight`
        )
        .then(res => {
            console.log(res.data);
            if(res.data.status === 0) {
                this.setState({ requests: res.data.data.content });
            }
            console.log(this.state.requests);
        })
    }

    sendInterest = (requestId) => {
        axios.patch(`/flight/${requestId}`
        )
        .then(res => {
            if(res.data.status === 0) {
                alert("Your interest has been sent to the student!");
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
                alert("Remove your interest success!");
                this.getRequests();
              } else {
                alert(res.data.msg);
              }
          })
    }

    render() {
        return (
            <div className="display-info">
                <p className="info-title">They are waiting for pick-up...</p>
                <ul>
                    {Object.keys(this.state.requests).map(key => (
                      <Request
                        key={key}
                        details={this.state.requests[key]}
                        sendInterest={this.sendInterest}
                        removeInterest={this.removeInterest}
                      />
                    ))}
                </ul>
            </div>
        );
    }
}

export default Volunteer;