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
              <div className="display-info">
                <h2 className="info-title">Edit your request...</h2>
                <p>Airport:</p>
                <select name="airport" onChange={this.handleChange} value={this.state.defaultRequest.airport}>
                  <option value="DCA">DCA</option>
                  <option value="IAD">IAD</option>
                  <option value="DUL">DUL</option>
                </select>
                <p>Destination:</p>
                <input
                  name="destination"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.defaultRequest.destination}
                />
                <p>Time:</p>
                <input
                  name="time"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.defaultRequest.time}
                />
                <p>Flight Information:</p>
                <input
                  name="flightInfo"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.defaultRequest.flightInfo}
                />
                <p>Description:</p>
                <textarea
                  name="description" 
                  onChange={this.handleChange}
                  value={this.state.defaultRequest.description}
                />
                <p>Number Of People:</p>
                <select name="numOfPeople" onChange={this.handleChange} value={this.state.defaultRequest.numOfPeople}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
                <p>Baggage:</p>
                <select name="baggage" onChange={this.handleChange} value={this.state.defaultRequest.baggage}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
                <button onClick={this.handleUpdate}>Save Request</button>
                <button onClick={() => this.props.deleteRequest()}>Cancel Request</button>
                <button onClick={this.props.editSwitch}>Back</button>
              </div>
            );
        }
    }
}

export default EditRequest;