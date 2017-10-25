import React, { Component } from 'react';
import './App.css';
import { sockets } from './utils/sockets';

class App extends Component {
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
        <div className="App">
          <p className="App-intro">
          This is the timer value: {this.state.timestamp}
          </p>
          <form>
            <input
              value={this.state.message}
              name="message"
              onChange={this.handleInputChange}
              type="text"
              placeholder="your message"
            />
            <button type="submit" onClick={this.submitForm}>Send</button>
          </form>
          <p>{this.state.sentMessage}</p>
          </div>
      );
    }
}

export default App;
