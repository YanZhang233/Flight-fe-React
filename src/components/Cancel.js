import React from "react";
import axios from "../base.js";
import { withRouter } from "react-router-dom";

class Cancel extends React.Component {

    state = {
        count: 5,
        success: null,
        msg: null 
    }

    handleCancel = () => {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const id = params.get('id');
        console.log(id);
        axios.patch(`user/cancelEmail/${id}`
        )
        .then(res => {
            console.log(res.data);
            if(res.data.status === 0) {
                this.setState({ success: true, msg: res.data.msg }, this.handleSuccess());
            } else {
                this.setState({ success: false, msg: res.data.msg });
            }
        })
    }

    handleSuccess = () => {
        setTimeout(() => this.props.history.push(`/`), 5000);
        setInterval(this.timer, 1000);
    }

    timer = () => {
        const time = this.state.count - 1;
        this.setState({ count: time });
    }

    handleBack = () => {
        this.props.history.push(`/`);
    }

    render () {
        
        return (
            <div className="activate">
                {this.state.success === null? 
                    <div>
                        <p>You will no longer receive the information about the coming students, so are you sure to cancel the Email notification?</p>
                        <br/>
                        <button className="cancel-button btn btn-primary" onClick={this.handleCancel}>Cancel Notification</button>
                        <br/>
                        <button className="cancel-button btn btn-primary" onClick={this.handleBack}>Back To Flight</button>
                    </div>
                    :
                    <div>
                        {this.state.success === true?
                            <p>Cancel email notification successfully! Back to system {this.state.count} seconds later...</p>
                            :
                            <p>{this.state.msg}</p>
                        }
                        <br/>
                        <button className="cancel-button btn btn-primary" onClick={this.handleBack}>Go To Flight</button>
                    </div>
                }
                <div>
                    <p onClick={() => window.open("https://foggystudio.com")} id="active-copyright" className="copyright">
                        2018©FoggyStudio
                    </p>
                </div>
            </div>
        );
        
    }

}

export default withRouter(Cancel);