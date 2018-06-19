import React from "react";
import { withRouter } from "react-router-dom";

class Active extends React.Component {

    componentDidMount() {
        setTimeout(() => this.props.history.push(`/`), 5000);
    }

    handleClick = () => {
        this.props.history.push(`/`);
    }

    render () {
        return (
            <div className="active">
                <p>Active your email successfully!</p>
                <button className="btn btn-primary" onClick={this.handleClick}>Go To Flight</button>
            </div>
        );
    }

}

export default withRouter(Active);