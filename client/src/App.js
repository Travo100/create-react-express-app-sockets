import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3001');


class App extends Component {
  componentDidMount() {
    socket.on('join', (io)=>{
      io.emit('message', 'hello!');
    })
  }
    
  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
