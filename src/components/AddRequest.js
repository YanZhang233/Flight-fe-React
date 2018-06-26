import React from "react";

class AddRequest extends React.Component {

    airportRef = React.createRef();
    destinationRef = React.createRef();
    timeRef = React.createRef();
    flightInfoRef = React.createRef();
    descriptionRef = React.createRef();
    numOfPeopleRef = React.createRef();
    baggageRef = React.createRef();

    createRequest = event => {
      // stop the form from submitting
      event.preventDefault();

      const request = {
          airport: this.airportRef.value.value,
          destination: this.destinationRef.value.value,
          time: this.timeRef.value.value,
          flightInfo: this.flightInfoRef.value.value,
          description: this.descriptionRef.value.value,
          numOfPeople: parseFloat(this.numOfPeopleRef.value.value),
          baggage: parseFloat(this.baggageRef.value.value)
      };

      console.log(request);

      this.props.addRequest(request);

    };

    render() {
        return (
          <div className="container">
              <div className="row ">

                  <div className="formDiv">
                      <form onSubmit={this.createRequest}>
                          <div className="form-group">
                              <label htmlFor="airport">Airport*</label>
                              <select  className="form-control" id="airport" name="airport" ref={this.airportRef}>
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
                                  ref={this.destinationRef}
                              />
                          </div>

                          <div className="form-group">
                              <label htmlFor="time">Arrival Time(e.g. 2018-08-08 EST)*</label>
                              <input
                                  required
                                  className="form-control"
                                  id="time"
                                  name="time"
                                  id="time"
                                  ref={this.timeRef}
                                  type="text"
                              />
                          </div>

                          <div className="form-group">
                              <label htmlFor="flightInfo">Flight Information</label>
                              <input
                                  className="form-control"
                                  id="flightInfo"
                                  name="flightInfo"
                                  ref={this.flightInfoRef}
                                  type="text"
                              />
                          </div>

                          <div className="form-group">
                              <label htmlFor="numOfPeople">Number Of People*</label>
                              <select  className="form-control" id="numOfPeople" name="numOfPeople" ref={this.numOfPeopleRef}>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                              </select>
                          </div>

                          <div className="form-group">
                              <label htmlFor="baggage">number of baggage*</label>
                              <select  className="form-control" id="baggage" name="baggage" ref={this.baggageRef}>
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
                                  ref={this.descriptionRef}
                                  type="text"
                                  maxLength="40"
                              />
                          </div>

                          <button className="btn btn-primary btn-block" type="submit"><i className="fas fa-plus"></i>  Add Request</button>

                      </form>


                  </div>


              </div>
          </div>

        );
    }
}

export default AddRequest;