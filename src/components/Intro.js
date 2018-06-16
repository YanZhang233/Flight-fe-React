import React from "react";
import { withRouter } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class Intro extends React.Component {

    render() {
        
        return (
           <React.Fragment>
               <nav className="navbar navbar-default fixed-top ">
                   <div className="container-fluid">
                       <div className="navbar-header">
                           <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                   data-target="#collapsebar" aria-expanded="false">
                               <span className="sr-only">Toggle navigation</span>
                               <span className="icon-bar"></span>
                               <span className="icon-bar"></span>
                           </button>
                           <a className="navbar-brand" href="/">Flight <i className="fas fa-plane"></i></a>

                       </div>
                       <div className="collapse navbar-collapse" id="collapsebar">
                           <ul className="nav navbar-nav navbar-right">
                               <li><a href="/">Login <i className="fas fa-sign-in-alt"></i></a></li>
                               <li><a href="/register">Signup <i className="fas fa-user-plus"></i></a></li>
                           </ul>
                       </div>
                   </div>
               </nav>

               <ReactCSSTransitionGroup
                   transitionName="AppearTransition"
                   transitionAppear={ true }
                   transitionAppearTimeout={ 1000 }
                   transitionEnter={ false }
                   transitionLeave={ false }
               >

                   <div className="container">
                       <div className="jumbotron">
                           <h1>Welcome</h1>
                           <p>blablabla</p>
                           <p><a className="btn btn-primary btn-lg" href="/">Get Started</a></p>
                       </div>
                   </div>

                   <div className="container">
                       <div className="entry">
                           <h3 className="entry-title">Intro to this web</h3>
                           <div className="line"></div>
                           <span className="post"> <i className="fas fa-calendar-alt"></i> 2018.06.15 by zz</span>
                           <p className="para">This is a website that helps you ...</p>
                       </div>
                   </div>


               </ReactCSSTransitionGroup>

           </React.Fragment>


        );
    }
}

export default withRouter(Intro);
 