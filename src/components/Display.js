import React from "react";
import EditRequest from "./EditRequest";
import DisplayLikes from "./DisplayLikes";
import DisplayRequest from "./DisplayRequest";

class Display extends React.Component {

    state = {
        edit: false, 
        checkLikes: false
    }

    editSwitch = () => {
        const ifEdit = !this.state.edit;
        this.setState({ edit: ifEdit });
    }

    likeSwitch = () => {
        const ifCheck = !this.state.checkLikes;
        this.setState({ checkLikes: ifCheck });
    }

    render() {
        if(this.state.edit) {
            return (
                <EditRequest 
                    default={this.props.requestInfo.request}
                    updateRequest={this.props.updateRequest}
                    deleteRequest={this.props.deleteRequest}
                    editSwitch={this.editSwitch}
                />
            );
        } else {
            if(this.state.checkLikes) {
                return (
                    <DisplayLikes 
                        likesList={this.props.requestInfo.likedUser}
                        likeSwitch={this.likeSwitch}
                    />
                );
            } else {
                return (
                    <DisplayRequest 
                        details={this.props.requestInfo.request}
                        editSwitch={this.editSwitch}
                        likeSwitch={this.likeSwitch}
                    />
                );
            }
        }
    }
}

export default Display;


