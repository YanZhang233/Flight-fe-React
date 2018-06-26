import React from "react";

class EditRequest extends React.Component {

    state = {
      defaultRequest: null
    }

    componentWillMount() {
      this.setState({ defaultRequest: this.props.default });
    }

    handleChange = event => {
        const updatedRequest = {
            ...this.state.defaultRequest,
            [event.currentTarget.name]: event.currentTarget.value
        };
        this.setState({ defaultRequest: updatedRequest });
    };

    handleUpdate = event => {
      this.props.updateRequest(this.state.defaultRequest);
      this.props.editSwitch();
    }

    render() {

        if(this.state.defaultRequest) {
            return (
              <div className="edit-content-container">
                  <div className="row">
                      <h2 className="info-title">Edit your request...</h2>
                      <div className="formDivLong">

                          <form onSubmit={this.handleUpdate}>

                              <div className="form-group">
                                  <label htmlFor="airport">Airport*</label>
                                  <select className="form-control" id="airport" name="airport" onChange={this.handleChange} value={this.state.defaultRequest.airport}>
                                      <option value="Washington Dulles International Airport">Washington Dulles International Airport</option>
                                      <option value="Ronald Reagan Washington National Airport">Ronald Reagan Washington National Airport</option>
                                      <option value="Baltimore International Airport">Baltimore International Airport</option>
                                  </select>
                              </div>

                              <div className="form-group">
                                  <label htmlFor="destination">Destination*</label>
                                  <input
                                      required
                                      className="form-control"
                                      id="destination"
                                      name="destination"
                                      type="text"
                                      onChange={this.handleChange}
                                      value={this.state.defaultRequest.destination}
                                  />
                              </div>

                              <div className="form-group">
                                  <label htmlFor="time">Arrival Time(e.g. 2018-08-08 EST)*</label>
                                  <input
                                      required
                                      className="form-control"
                                      id="time"
                                      name="time"
                                      type="text"
                                      onChange={this.handleChange}
                                      value={this.state.defaultRequest.time}
                                  />
                              </div>


                              <div className="form-group">
                                  <label htmlFor="flightInfo">Flight Information</label>
                                  <input
                                      className="form-control"
                                      id="flightInfo"
                                      name="flightInfo"
                                      type="text"
                                      onChange={this.handleChange}
                                      value={this.state.defaultRequest.flightInfo}
                                  />
                              </div>



                              <div className="form-group">
                                  <label htmlFor="airport">Number Of People*</label>
                                  <select  id="airport" className="form-control" name="numOfPeople" onChange={this.handleChange} value={this.state.defaultRequest.numOfPeople}>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                  </select>
                              </div>

                              <div className="form-group">
                                  <label htmlFor="baggage">Baggage*</label>
                                  <select  id="baggage" className="form-control" name="baggage" onChange={this.handleChange} value={this.state.defaultRequest.baggage}>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                  </select>
                              </div>
                              <div className="form-group">
                                  <label htmlFor="description">Description</label>
                                  <input
                                      className="form-control"
                                      id="description"
                                      name="description"
                                      onChange={this.handleChange}
                                      value={this.state.defaultRequest.description}
                                      maxLength="40"
                                  />
                              </div>
                              <button className="btn btn-primary btn-block" type="submit" >Save Request</button>
                              <button className="btn btn-primary btn-block" onClick={() => this.props.deleteRequest()}>Cancel Request</button>
                              <br/>
                              <a className="back" onClick={this.props.editSwitch}>Back</a>

                          </form>

                      </div>
                  </div>

              </div>

            );
        }
    }
}

export default EditRequest;