import React from "react";
import axios from "axios";
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
            }
            console.log(res.data);
        })
    }


    render() {
        return (
            <div className="inventory">
                Volunteer
                <ul className="fishes">
                    {Object.keys(this.state.requests).map(key => (
                      <Request
                        key={key}
                        details={this.state.requests[key]}
                        sendInterest={this.sendInterest}
                      />
                    ))}
                </ul>
            </div>
        );
    }
}

export default Volunteer;