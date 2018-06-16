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
            <div className="edit-content-container">
                <div className="row">
                    <p className="info-title">Waiting for pick-up...😁</p>
                    <ul className="list-group">
                        <li className="list-group-item"> Airport: {airport}</li>
                        <li className="list-group-item">Destination: {destination}</li>
                        <li className="list-group-item">Time: {time}</li>
                        <li className="list-group-item">Flight Information: {flightInfo}</li>
                        <li className="list-group-item">Baggage: {baggage}</li>
                        <li className="list-group-item">Description: {description}</li>
                        <li className="list-group-item" id="displayLike" onClick={this.props.likeSwitch}>People want to help  <span className="badge">{like}</span></li>
                        <button className="btn btn-primary btn-block" onClick={this.props.editSwitch}>Edit</button>

                    </ul>

                </div>
            </div>

        );
    }
}

export default DisplayRequest;