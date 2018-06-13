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
          <li className="menu-fish">
            <p>{airport}</p>
            <p>{destination}</p>
            <p>{time}</p>
            <p>{flightInfo}</p>
            <p>{description}</p>
            <p>{numOfPeople}</p>
            <p>{baggage}</p>
            <button 
                disabled={noLike}
                onClick={this.props.likeSwitch}
            >
                {noLike ? "No one wants to pick you up :)" : like}
            </button>
            <button onClick={this.props.editSwitch}>Edit</button>
          </li>
        );
    }
}

export default DisplayRequest;