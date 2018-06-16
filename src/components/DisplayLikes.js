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
            <div className="edit-content-container">
                <div className="row">
                    <p className="info-title">Contact List</p>
                    <ul className="list-group">
                        {Object.keys(this.state.likes).map(key => (
                            <Like
                                key={key}
                                likedUser={this.state.likes[key]}
                            />
                        ))}

                        <button className="btn btn-primary btn-block" onClick={this.props.likeSwitch}>Back</button>
                    </ul>

                </div>


            </div>
        );
    }
}

export default DisplayLikes;


