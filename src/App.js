import React, { Component } from 'react';
import HandsContainer from './HandsContainer.js'
import './App.css';

class App extends Component {
  state={
    players: [
      {
        name: "Ted"
      },
      {
        name: "Louis"
      }
    ]
  }

  render() {
    return (
      <div className="App">
        <h1>Hello world</h1>
        <HandsContainer players={this.state.players}/>
      </div>
    );
  }
}

export default App;
