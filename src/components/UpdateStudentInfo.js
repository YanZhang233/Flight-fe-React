import React from "react";

class UpdateStudentInfo extends React.Component {

    state = {
      defaultInfo: null
    }

    componentWillMount() {
      this.setState({ defaultInfo: this.props.default });
    }

    handleChange = event => {
        const updatedInfo = {
            ...this.state.defaultInfo,
            [event.currentTarget.name]: event.currentTarget.value
        };
        this.setState({ defaultInfo: updatedInfo });
    };

    handleUpdate = event => {
      this.props.updateStudentInfo(this.state.defaultInfo);
    }

    render() {

        if(this.state.defaultInfo) {
            return (
              <div className="display-info">
                <h2 className="info-title">Edit your personal information...</h2>
                <p>Actual Name:</p>
                <input
                  name="actualName"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.defaultInfo.actualName}
                />
                <p>Email:</p>
                <input
                  name="email"
                  type="email"
                  readOnly
                  value={this.state.defaultInfo.email}
                />
                <p>Wechat:</p>
                <input
                  name="wechat"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.defaultInfo.wechat}
                />
                <p>Gender:</p>
                <select name="gender" onChange={this.handleChange} value={this.state.defaultInfo.gender}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <p>Graduated From:</p>
                <input
                  name="graduatedFrom"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.defaultInfo.graduatedFrom}
                />
                <p>Hometown:</p>
                <input
                  name="homeTown"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.defaultInfo.homeTown}
                />
                <p>Major:</p>
                <input
                  name="major"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.defaultInfo.major}
                />
                <button onClick={this.handleUpdate}>Save Information</button>
                <button onClick={this.props.infoSwitch}>
                    Back
                </button> 
              </div>
            );
        } else {
          return <p>You Got No Information!!!</p>;
        }
    }
}

export default UpdateStudentInfo;