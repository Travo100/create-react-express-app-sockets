import React, {Component} from 'react';
import './SocketForm.css';
import {sockets} from '../../utils/sockets';

class SocketForm extends Component {
  state = {
    message: '',
    sentMessage: '',
    messages: []
  };

  constructor(props) {
    super(props);
    sockets.listenForMessage(data => {
      let messages = [...this.state.messages, data];
      this.setState({messages: messages})
    });
  }

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const {name, value} = event.target;
    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  submitForm = event => {
    event.preventDefault();
    sockets.sendMessage(this.state.message);
    this.setState({message: ""});
  };

  render() {
    return (
      <div>
        <p>Received Messages:</p>
        <ul>
          {this.state.messages.map(message => <li key={message}>{message}</li>)}
        </ul>
        <form className="form-inline">
          <div className="form-group">
            <input
              value={this.state.message}
              name="message"
              onChange={this.handleInputChange}
              type="text"
              placeholder="your message"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.submitForm}>Submit</button>
        </form>
      </div>
    );
  }
}

export default SocketForm;
