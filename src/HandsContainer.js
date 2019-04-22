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
    ],
    hand1: [],
    hand2: [],
    winningHand: 0
  }

  componentDidUpdate(){
    const handValues = (hand) => {
      return hand.map(card => {
        return card.charAt(0)
      }).sort()
    }

    console.log(handValues(this.state.hand1))
    console.log(handValues(this.state.hand2))
    const containsPair = (hand) => {
      const values = handValues(hand)
      for (let i=0; i<values.length - 1; i++) {
        if (values[i] === values[i+1]) {
          return true
        }        
      }
      return false
    }
    console.log(containsPair(this.state.hand1))
    console.log(containsPair(this.state.hand2))


  }

  render() {
    const player1 = this.props.players[0]
    const player2 = this.props.players[1]
    const randomCard = (cards) => {
      return cards[Math.floor(Math.random()*cards.length)]
    }

    const dealCards = () => {
      this.setState({
        hand1: [randomCard(this.state.cards), randomCard(this.state.cards), randomCard(this.state.cards), randomCard(this.state.cards), randomCard(this.state.cards)],
        hand2: [randomCard(this.state.cards), randomCard(this.state.cards), randomCard(this.state.cards), randomCard(this.state.cards), randomCard(this.state.cards)]
      })
    }

    return (
      <div>
        <button onClick={() => dealCards()}>Deal!</button>
        <Hand key={player1.name} player={player1} hand={this.state.hand1}/>
        <Hand key={player2.name} player={player2} hand={this.state.hand2}/>
      </div>
    )
  }
}

export default HandsContainer;
