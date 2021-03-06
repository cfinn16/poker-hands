import React, { Component } from 'react';
import HandsContainer from './HandsContainer.js'
import './App.css';

class App extends Component {
  state={
    players: [
        "Ted",
        "Louis"
    ]
  }

  render() {
    return (
      <div className="App">
        <h1>Let's play some poker</h1>
        <HandsContainer players={this.state.players}/>
      </div>
    );
  }
}

export default App;
