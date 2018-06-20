import React from "react";
import axios from "../base.js";
import { withRouter } from "react-router-dom";

class Active extends React.Component {

    state = {
        count: 5
    }

    componentWillMount() {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const id = params.get('id');
        const token = params.get('token');
        console.log(id);
        console.log(token);
        axios.patch(`/email/${id}/${token}`
        )
        .then(res => {
            console.log(res.data);
            alert(res.data.msg);
        })
    }

    componentDidMount() {
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
            <div className="active">
                <p>Active your email successfully! Back to system {this.state.count} seconds later...</p>
                <br/>
                <button className="btn btn-primary" onClick={this.handleClick}>Go To Flight</button>
                <div>
                    <p id="active-copyright" className="copyright">
                        2018©FoggyStudio
                    </p>
                </div>
            </div>
        );
    }

}

export default withRouter(Active);