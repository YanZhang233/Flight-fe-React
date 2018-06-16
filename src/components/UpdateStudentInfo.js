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
                <React.Fragment>

                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="thumbnail">
                                    <img  className="img-responsive" src="" />
                                    <h2>UserName</h2>
                                </div>

                            </div>

                            <div className="col-md-9">
                                <div className="well">
                                    <form onSubmit={this.handleUpdate}>
                                        <div className="form-group">
                                            <label htmlFor="actualName">Name</label>
                                            <input
                                                className="form-control"
                                                id="actualName"
                                                name="actualName"
                                                type="text"
                                                onChange={this.handleChange}
                                                value={this.state.defaultInfo.actualName}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                className="form-control"
                                                id="email"
                                                name="email"
                                                type="email"
                                                readOnly
                                                value={this.state.defaultInfo.email}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="wechat">Wechat</label>
                                            <input
                                                className="form-control"
                                                id="wechat"
                                                name="wechat"
                                                type="text"
                                                onChange={this.handleChange}
                                                value={this.state.defaultInfo.wechat}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="gender">Gender</label>
                                            <select className="form-control" id="gender" name="gender" onChange={this.handleChange} value={this.state.defaultInfo.gender}>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="graduatedFrom">GraduatedFrom</label>
                                            <input
                                                className="form-control"
                                                id="graduatedFrom"
                                                name="graduatedFrom"
                                                type="text"
                                                onChange={this.handleChange}
                                                value={this.state.defaultInfo.graduatedFrom}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="homeTown">HomeTown</label>
                                            <input
                                                className="form-control"
                                                id="homeTown"
                                                name="homeTown"
                                                type="text"
                                                onChange={this.handleChange}
                                                value={this.state.defaultInfo.homeTown}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="major">Major</label>
                                            <input
                                                className="form-control"
                                                id="major"
                                                name="major"
                                                type="text"
                                                onChange={this.handleChange}
                                                value={this.state.defaultInfo.major}
                                            />
                                        </div>

                                        <button type="submit">Save Information</button>
                                        <button onClick={this.props.infoSwitch}>Back</button>

                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>


                </React.Fragment>

            );
        } else {
          return <p>You Got No Information!!!</p>;
        }
    }
}

export default UpdateStudentInfo;