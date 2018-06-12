import React from "react";

class Like extends React.Component {

    render() {
        const { 
            email, 
            wechat
        } = this.props.likedUser;
        
        return (
          <li className="menu-fish">
            <p>{email}</p>
            <p>{wechat}</p>
          </li>
        );
    }
}

export default Like;
