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
          <li className="menu-fish">
            <p>{airport}</p>
            <p>{destination}</p>
            <p>{time}</p>
            <p>{flightInfo}</p>
            <p>{description}</p>
            <p>{numOfPeople}</p>
            <p>{baggage}</p>
            <p>{like}</p>
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
