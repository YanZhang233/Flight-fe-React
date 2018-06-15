import React from "react";
import axios from "../base.js";

class Request extends React.Component {

    state = {
        haveInterest: false
    }

    componentWillMount() {
        this.checkInterest();
    }

    checkInterest = () => {
        axios.get(`/flight/like/${this.props.details.id}`
        )
        .then(res => {
            if(res.data.status === 0) {
                this.setState({ haveInterest: true});
            }
        })
    }

    handleClick = event => {
        const id = this.props.details.id;
        if(this.state.haveInterest) {
            this.props.removeInterest(id);
        } else {
            this.props.sendInterest(id);
        }
        const updatedInterest = !this.state.haveInterest;
        this.setState({ haveInterest: updatedInterest });
    }
    
    render() {
        const { 
            requestUserId,
            airport, 
            destination, 
            time, 
            flightInfo, 
            description,
            numOfPeople,
            baggage,
            like
        } = this.props.details;

        return (
          <li className="display-info">
            <p>Airport: {airport}</p>
            <p>Destination: {destination}</p>
            <p>Time: {time}</p>
            <p>FlightInfo: {flightInfo}</p>
            <p>Description: {description}</p>
            <p>Number Of People: {numOfPeople}</p>
            <p>Baggage: {baggage}</p>
            <p>There are {like} people want to pick him/her up.</p>
            <button 
                onClick={() => this.props.checkStudent(requestUserId)}
            >
                Check the Information of the student
            </button>
            <button 
                onClick={this.handleClick}
            >
                {this.state.haveInterest ? "Cancel Interest" : "I Have Interest"}
            </button>
          </li>
        );
    }
}

export default Request;
