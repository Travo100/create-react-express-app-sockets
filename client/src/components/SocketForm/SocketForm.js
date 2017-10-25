import React, { Component } from 'react';
import { sockets } from '../../utils/sockets';

class SocketForm extends Component {
  state = {
    timestamp: 'no timestamp yet',
    message: '',
    sentMessage: ''
  };
  
  constructor(props) {
    super(props);
    sockets.listenForMessage((sentMessage) => this.setState({sentMessage}));
  }

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;
    // Updating the input's state
    this.setState({
      [name]: value
    });
  };
  
  submitForm = (event) => {
    event.preventDefault();
    sockets.sendMessage(this.state.message);
    this.setState({message: ""});
  }
    render() {
      return (
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
          <button type="submit" className="btn btn-default" onClick={this.submitForm}>Submit</button>
          <p><span>Sent Message:</span> {this.state.sentMessage}</p>
        </form>
        
      );
    }
}

export default SocketForm;
