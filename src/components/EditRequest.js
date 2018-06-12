import React from "react";

class EditRequest extends React.Component {

    handleChange = event => {
        console.log(event.currentTarget.name);
        console.log(event.currentTarget.value);
        const updatedRequest = {
            ...this.props.default,
            [event.currentTarget.name]: event.currentTarget.value
        };
        console.log(updatedRequest);
    };

    render() {

        if(this.props.default) {
            return (
              <div className="fish-edit">
                <select name="airport" onChange={this.handleChange} value={this.props.default.airport}>
                  <option value="DCA">DCA</option>
                  <option value="IAD">IAD</option>
                  <option value="DUL">DUL</option>
                </select>
                <input
                  name="destination"
                  type="text"
                  onChange={this.handleChange}
                  value={this.props.default.destination}
                />
                <input
                  name="time"
                  type="text"
                  onChange={this.handleChange}
                  value={this.props.default.time}
                />
                <input
                  name="flightInfo"
                  type="text"
                  onChange={this.handleChange}
                  value={this.props.default.flightInfo}
                />
                <textarea
                  name="description" 
                  onChange={this.handleChange}
                  value={this.props.default.description}
                />
                <select name="numOfPeople" onChange={this.handleChange} value={this.props.default.numOfPeople}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
                <select name="baggage" onChange={this.handleChange} value={this.props.default.baggage}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
                <button onClick={this.props.updateRequest}>Save Request</button>
                <button onClick={this.props.deleteRequest}>Cancel Request</button>
                <button onClick={this.props.editSwitch}>Back</button>
              </div>
            );
        }
    }
}

export default EditRequest;