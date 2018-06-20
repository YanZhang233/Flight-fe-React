import React from "react";
import axios from "../base.js";

class StudentInRequest extends React.Component {

    state = {
        studentInfo: null
    }

    componentWillMount() {
        this.getStudentInfo(this.props.studentId);
    }

    getStudentInfo = (studentId) => {
        axios.get(`/user/${studentId}`
        )
        .then(res => {
            console.log(res.data);
            if(res.data.status === 0) {
                this.setState({ studentInfo: res.data.data });
            } else {
                alert(res.data.msg);
            }
        })
    };

    render() {
        if(this.state.studentInfo) {
            const { 
              email,
              wechat, 
              actualName, 
              gender, 
              graduatedFrom, 
              homeTown, 
              major,
                avatar
            } = this.state.studentInfo;

            return (
                <React.Fragment>

                    <div className="container">

                        <div className="row">


                            <div className="col-xs-12 col-md-3">
                                <div className="col-md-12" id="thumContainer">
                                    <div className="thumbnail" id="infoAvatar" >
                                        <img className="img-responsive" id="avatar-display" src={avatar} />
                                    </div>
                                </div>

                                <div  className="col-md-12">
                                    <h4>{email}</h4>
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
                                                value={actualName}
                                                readOnly
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
                                                value={email}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="wechat">Wechat</label>
                                            <input
                                                className="form-control"
                                                id="wechat"
                                                name="wechat"
                                                type="text"
                                                value={wechat}
                                                readOnly
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="gender">Gender</label>
                                            <input
                                                className="form-control"
                                                id="gender"
                                                name="gender"
                                                type="text"
                                                value={gender===0?"Female":"Male"}
                                                readOnly
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="graduatedFrom">GraduatedFrom</label>
                                            <input
                                                className="form-control"
                                                id="graduatedFrom"
                                                name="graduatedFrom"
                                                type="text"
                                                value={graduatedFrom}
                                                readOnly
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="homeTown">HomeTown</label>
                                            <input
                                                className="form-control"
                                                id="homeTown"
                                                name="homeTown"
                                                type="text"
                                                value={homeTown}
                                                readOnly
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="major">Major</label>
                                            <input
                                                className="form-control"
                                                id="major"
                                                name="major"
                                                type="text"
                                                value={major}
                                                readOnly
                                            />
                                        </div>

                                        <button className="btn btn-primary btn-block" onClick={() => this.props.checkStudent(null)}>back</button>

                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>




                </React.Fragment>


            );
        } else {
            return <p>No Information!!!</p>;
        }
    }
}

export default StudentInRequest;