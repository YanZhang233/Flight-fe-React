import React from "react";

class Like extends React.Component {

    render() {
        const { 
            email, 
            wechat
        } = this.props.likedUser;
        
        return (
          <li className="display-info">
            <p>Email: {email}</p>
            <p>Wechat: {wechat}</p>
          </li>
        );
    }
}

export default Like;
