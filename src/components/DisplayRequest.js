import React from "react";

class DisplayRequest extends React.Component {

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

        const noLike = like === 0; 

        return (
          <li className="display-info">
            <p className="info-title">Waiting for pick-up...😁</p>
            <p>Airport: {airport}</p>
            <p>Destination: {destination}</p>
            <p>Time: {time}</p>
            <p>Flight Information: {flightInfo}</p>
            <p>Description: {description}</p>
            <p>Number Of People: {numOfPeople}</p>
            <p>Baggage: {baggage}</p>
            <button className="likeNum"
                disabled={noLike}
                onClick={this.props.likeSwitch}
            >
                {noLike ? "No one wants to pick you up :)" : "There are " + like + " people want to pick you up."}
            </button>
            <button onClick={this.props.editSwitch}>Edit</button>
          </li>
        );
    }
}

export default DisplayRequest;