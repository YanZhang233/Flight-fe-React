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
              <div className="fish-edit">
                <select name="airport" onChange={this.handleChange} value={this.state.defaultRequest.airport}>
                  <option value="DCA">DCA</option>
                  <option value="IAD">IAD</option>
                  <option value="DUL">DUL</option>
                </select>
                <input
                  name="destination"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.defaultRequest.destination}
                />
                <input
                  name="time"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.defaultRequest.time}
                />
                <input
                  name="flightInfo"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.defaultRequest.flightInfo}
                />
                <textarea
                  name="description" 
                  onChange={this.handleChange}
                  value={this.state.defaultRequest.description}
                />
                <select name="numOfPeople" onChange={this.handleChange} value={this.state.defaultRequest.numOfPeople}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
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