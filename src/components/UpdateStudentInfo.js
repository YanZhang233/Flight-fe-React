import React from "react";
import axios from "../base.js";

class UpdateStudentInfo extends React.Component {

    state = {
      defaultInfo: null,
      avatar: null
    }

    componentWillMount() {
      this.setState({ 
        defaultInfo: this.props.default, 
        avatar: this.props.default.avatar 
      });
    }

    handleChange = event => {
        const updatedInfo = {
            ...this.state.defaultInfo,
            [event.currentTarget.name]: event.currentTarget.value
        };
        this.setState({ defaultInfo: updatedInfo });
    };

    handleUpdate = event => {
        event.preventDefault();
        this.props.updateStudentInfo(this.state.defaultInfo, this.state.avatar);
    }

    avatarChangeHandler = (event) => {
        const image = event.target.files[0];
        this.uploadHandler(image);
    }

    uploadHandler = (image) => {
        console.log(image);
        const formData = new FormData();
        formData.append('upload_file', image);
        axios.post(`/user/avatar`, formData
        )
        .then(res => {
            console.log(res.data);
            if(res.data.status === 0) {
                this.setState({ avatar: res.data.data.url });
            } else {
                alert("Upload avatar failed!");
            }    
        })
    }

    render() {

        if(this.state.defaultInfo) {
            return (
                <React.Fragment>

                    <div className="container">

                        <div className="row">


                            <div className="col-xs-12 col-md-3">
                                <div className="col-md-12" id="thumContainer">
                                    <div className="thumbnail" id="infoAvatar" >
                                        <img className="img-responsive" id="avatar-display" src={this.state.avatar} />
                                    </div>
                                </div>

                                <div  className="col-md-12">
                                    <label htmlFor="input-avatar" id="avatarChange" className="btn btn-primary">
                                        Change Avatar
                                    </label>
                                    <input
                                        id="input-avatar"
                                        name="upload_file"
                                        type="file"
                                        accept="image/*"
                                        onChange={this.avatarChangeHandler}
                                    />
                                </div>

                            </div>
                            <div className="col-xs-12 col-md-9">
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
                                                <option value="1">Male</option>
                                                <option value="0">Female</option>
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

                                        <button className="btn btn-success" type="submit">Save Information</button>
                                        <br/>
                                        <br/>
                                        <a className="back" onClick={this.props.infoSwitch}>Back</a>

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