import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faFighterJet } from "@fortawesome/fontawesome-free-solid";

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
                <p>Destination: {destination}</p>
                <p>Time: {time}</p>
                <p>Flight Information: {flightInfo}</p>
                <p>Number Of People: {numOfPeople}</p>
                <p>Baggage: {baggage}</p>
                <p>{description}</p>
                <button className="likeNum"
                    disabled={noLike}
                    onClick={this.props.likeSwitch}
                >
                    {noLike ? "No one wants to pick you up :)" : "There are " + like + " people want to pick you up."}
                </button>
            <button onClick={this.props.editSwitch}>Edit</button>
          </li>
          </div>
        );
    }
}

export default DisplayRequest;