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
            <div className="container">
                <div className="row">
                    <p className="info-title">Contact List</p>
                    <ul class="list-group">
                        {Object.keys(this.state.likes).map(key => (
                            <Like
                                key={key}
                                likedUser={this.state.likes[key]}
                            />
                        ))}

                        <button className="btn btn-info btn-block" onClick={this.props.likeSwitch}>Back</button>
                    </ul>

                </div>


            </div>
        );
    }
}

export default DisplayLikes;


