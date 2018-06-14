import React from "react";
import { withRouter } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class Intro extends React.Component {

    render() {
        
        return (
          <ReactCSSTransitionGroup
                transitionName="AppearTransition"
                transitionAppear={ true }
                transitionAppearTimeout={ 1000 }
                transitionEnter={ false }
                transitionLeave={ false }
          >
            <div className="entry">
              <p>This is Introduction.</p>
              <button onClick={() => {this.props.history.push(`/flight`)}}>
                  Go to Request!
              </button> 
            </div>
          </ReactCSSTransitionGroup>
        );
    }
}

export default withRouter(Intro);
