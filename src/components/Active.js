import React from "react";
import axios from "../base.js";
import { withRouter } from "react-router-dom";

class Active extends React.Component {

    state = {
        count: 5,
        success: null,
        msg: null
    }

    componentWillMount() {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const id = params.get('id');
        const token = params.get('token');
        console.log(id);
        console.log(token);
        axios.patch(`user/email/${id}/${token}`
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

    handleClick = () => {
        this.props.history.push(`/`);
    }

    render () {
        return (
            <div className="activate">
                {this.state.success === true?
                    <p>Active your email successfully! Back to system {this.state.count} seconds later...</p>
                    :
                    <p>{this.state.msg}</p>
                }
                <br/>
                <button className="btn btn-primary" onClick={this.handleClick}>Go To Flight</button>
                <div>
                    <p onClick={() => window.open("https://foggystudio.com")} id="active-copyright" className="copyright">
                        2018©FoggyStudio
                    </p>
                </div>
            </div>
        );
    }

}

export default withRouter(Active);