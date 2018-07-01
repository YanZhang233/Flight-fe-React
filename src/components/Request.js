import React from "react";
import axios from "../base.js";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faCar, faArrowsAltH, faFighterJet, faCalendarAlt, faUsers, faSuitcase, faThumbsUp, faThumbsDown } from "@fortawesome/fontawesome-free-solid";


class Request extends React.Component {

    state = {
        haveInterest: null
    }

    componentWillMount() {
        this.checkInterest();
    }

    componentWillReceiveProps() {
        this.checkInterest();
    }

    checkInterest = () => {
        axios.get(`/flight/like/${this.props.details.id}`
        )
        .then(res => {
            if(res.data.status === 0) {
                this.setState({ haveInterest: true });
            } else {
                this.setState({ haveInterest: false });
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
        this.checkInterest();
        // const updatedInterest = !this.state.haveInterest;
        // this.setState({ haveInterest: updatedInterest });
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
            like,
            avatar,
            gender,
            homeTown,
            graduatedFrom
        } = this.props.details;


        return (

                <React.Fragment>



                        <div className="col-xs-12 col-md-6 col-lg-4">
                            <div className="display-header">
                                <i className="fas fa-circle" id="display-header-icon"></i>
                            </div>
                            <div className="display-content-container" >

                                <div className="row infoLine" id="avatarLine">
                                    <a
                                       className="thumbnail"
                                       onClick={() => this.props.checkStudent(requestUserId)}
                                    >
                                        <img id="avatar-display" src={avatar} />
                                    </a>

                                    <div className="person">
                                        {
                                            gender===0?
                                                <p>gender : <i className="fas fa-venus"></i> </p>
                                                :
                                                <p> gender : <i className="fas fa-mars"></i></p>
                                        }
                                        <p>From : {homeTown}</p>
                                        <p>School : {graduatedFrom}</p>
                                    </div>

                                </div>

                                <div className="request-content">
                                <div className="row infoLine" >
                             <span className="info">
                                <FontAwesomeIcon icon={faCar} />  {airport}
                                  <FontAwesomeIcon icon={faArrowsAltH} />  {destination}
                             </span>

                                </div>


                                <div className="row infoLine" >
                            <span className="info">
                                <FontAwesomeIcon icon={faCalendarAlt} />  {time}
                             </span>
                                </div>

                                <div className="row infoLine" >
                           <span className="info">
                                <i className="fas fa-plane"></i>  {flightInfo}
                            </span>
                                </div>

                                <div className="row infoLine">
                             <span className="info">
                                <FontAwesomeIcon icon={faUsers} />  {numOfPeople} People
                             </span>
                                    <span className="info">
                                <FontAwesomeIcon icon={faSuitcase} />  {baggage} Baggage(s)
                             </span>
                                </div>


                                <p className="description">{description}</p>
                                </div>

                                {this.state.haveInterest ?
                                    <button className="btn btn-danger helpButton" onClick={this.handleClick}>Cancel help</button>
                                    :
                                    <button className="btn btn-success helpButton" onClick={this.handleClick}>Give a
                                        help</button>
                                }
                                <p className="description">
                                    {this.state.haveInterest ?
                                        <i className="fas fa-thumbs-up "></i>
                                        :
                                        <i className="far fa-thumbs-up "></i>

                                    }
                                    <span> {like} people want to help {gender===0?"her":"him"}</span>
                                </p>
                            </div>
                        </div>

                </React.Fragment>

        );
    }
}

export default Request;
