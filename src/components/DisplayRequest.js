import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/fontawesome-free-solid";

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
          <div className="edit-content-container">
          <li className="display-info">
            <p className="info-title">Waiting for pick-up...😁</p>
                <p className="displayRow">
                    Airport
                    <span className="right">{airport}</span>
                </p>
                <p className="displayRow">
                    Destination
                    <span className="right">{destination}</span>
                </p>
                <p className="displayRow">
                    Time
                    <span className="right">{time}</span>
                </p>
                <p className="displayRow">
                    Flight Information
                    <span className="right">{flightInfo}</span>
                </p>
                <p className="displayRow">
                    Number Of People
                    <span className="right">{numOfPeople}</span>
                </p>
                <p className="displayRow">
                    Baggage
                    <span className="right">{baggage}</span>
                </p>
                <p className="displayRow">
                    {description}
                </p>
                <button className="likeNum"
                    disabled={noLike}
                    onClick={this.props.likeSwitch}
                >
                    <FontAwesomeIcon icon={faUsers} /> {noLike ? "No one wants to pick you up :)" : "There are " + like + " people want to pick you up."}
                </button>
            <button onClick={this.props.editSwitch}>Edit</button>
          </li>
          </div>
        );
    }
}

export default DisplayRequest;