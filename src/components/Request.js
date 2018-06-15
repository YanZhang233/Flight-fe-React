import React from "react";
import axios from "../base.js";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faCar, faArrowsAltH, faFighterJet, faCalendarAlt, faUsers, faSuitcase, faThumbsUp, faThumbsDown } from "@fortawesome/fontawesome-free-solid";


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
          <div className="display-content-container">
                <button 
                    onClick={() => this.props.checkStudent(requestUserId)}
                >
                    Check the Information of the student
                </button>
                <p>
                     <span className="info">
                        <FontAwesomeIcon icon={faCar} /> {airport} 
                        <FontAwesomeIcon icon={faArrowsAltH} /> {destination} 
                     </span> 
                     <span className="info">
                        <FontAwesomeIcon icon={faCalendarAlt} /> {time}
                     </span> 
                     <span className="info"> 
                        <FontAwesomeIcon icon={faFighterJet} /> {flightInfo}
                     </span> 
                     <span className="info">
                        <FontAwesomeIcon icon={faUsers} /> {numOfPeople} People 
                     </span> 
                     <span className="info">
                        <FontAwesomeIcon icon={faSuitcase} /> {baggage} Baggages
                     </span> 
                </p>
                <p>{description}</p>
                <p>
                    <button className="likeButton"
                        onClick={this.handleClick}
                    >
                        {this.state.haveInterest ? 
                            <FontAwesomeIcon icon={faThumbsUp} /> 
                            : 
                            <FontAwesomeIcon icon={faThumbsDown} /> 
                        }
                    </button>
                    <span> {like} people want to pick him/her up.</span>
                </p>
            </div>
          </li>
        );
    }
}

export default Request;
