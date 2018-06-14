import React from "react";
import { withRouter } from "react-router-dom";

class Intro extends React.Component {

    render() {
        
        return (
            <div className="entry">
              <p>This is Introduction.</p>
              <button onClick={() => {this.props.history.push(`/flight`)}}>
                  Go to Request!
              </button> 
            </div>
        );
    }
}

export default withRouter(Intro);
