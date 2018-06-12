import React from "react";

class Request extends React.Component {

    render() {
        const { 
            id,
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
                onClick={ () => this.props.sendInterest(id) }
            >
            I have interest
            </button>
          </li>
        );
    }
}

export default Request;
