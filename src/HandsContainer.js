import React, { Component } from 'react';
import Hand from './Hand.js'


class HandsContainer extends Component {
  state = {
    cards: [
      "2H", "2C", "2S", "2D",
      "3H", "3C", "3S", "3D",
      "4H", "4C", "4S", "4D",
      "5H", "5C", "5S", "5D",
      "6H", "6C", "6S", "6D",
      "7H", "7C", "7S", "7D",
      "8H", "8C", "8S", "8D",
      "9H", "9C", "9S", "9D",
      "10H", "10C", "10S", "10D",
      "JH", "JC", "JS", "JD",
      "QH", "QC", "QS", "QD",
      "KH", "KC", "KS", "KD",
      "AH", "AC", "AS", "AD",
    ]
  }

  render() {
    return (
      <div>
        <h1>Here is where the hands go</h1>
        {this.props.players.map(player => {
          return <Hand key={player.name} player={player} cards={this.state.cards}/>
        })}
      </div>
    )
  }
}

export default HandsContainer;
