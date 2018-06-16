import React from "react";

class Like extends React.Component {

    render() {
        const { 
            email, 
            wechat
        } = this.props.likedUser;
        
        return (
          <li class="list-group-item">
            <p>Email: {email}</p>
            <span>Wechat: {wechat}</span>
          </li>
        );
    }
}

export default Like;
