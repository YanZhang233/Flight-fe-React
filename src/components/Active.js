import React from "react";

class Active extends React.Component {

    handleClick = () => {
        
        console.log("active");
    }

    render () {
        return (
            <button onClick={this.handleClick}>Active</button>
        );
    }

}

export default Active;