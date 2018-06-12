import React from "react";
import Like from "./Like";

class DisplayLikes extends React.Component {

    state = {
        likes: []
    }

    componentWillMount() {
        this.setState({ likes: this.props.likesList });
    }

    render() {

        return (
            <div className="inventory">
                Likes List
                <ul className="fishes">
                    {Object.keys(this.state.likes).map(key => (
                      <Like
                        key={key}
                        likedUser={this.state.likes[key]}
                      />
                    ))}
                </ul>
                <button onClick={this.props.likeSwitch}>Back</button>
            </div>
        );
    }
}

export default DisplayLikes;


