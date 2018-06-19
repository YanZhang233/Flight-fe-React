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
            <button onClick={this.handleClick}>Go To Flight!</button>
        );
    }

}

export default withRouter(Active);