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
    winner: null,
    winningMessage: ""
  }

  render() {
    const player1 = this.props.players[0]
    const player2 = this.props.players[1]

    const handValues = (hand) => {
      return hand.map(card => {
        if (card.charAt(0) === "1") {
          return parseInt(card.charAt(0) + card.charAt(1))
        }
        return parseInt(card.charAt(0))
      }).sort()
    }

    const suits = (hand) => {
      return hand.map(card => {
        return card.charAt(card.length - 1)
      })
    }

    const containsPair = (hand) => {
      const values = handValues(sequencedHand(hand)).sort((a, b) => a - b)
      for (let i=0; i<values.length - 1; i++) {
        if (values[i] === values[i+1]) {
          return true
        }
      }
      return false
    }

    const findPair = (hand) => {
      const values = handValues(sequencedHand(hand)).sort((a, b) => a - b)
      for (let i=0; i<values.length - 1; i++) {
        if (values[i] === values[i+1]) {
          return values[i]
        }
      }
    }

    const findHigherPair = (hand) => {
      const values = handValues(sequencedHand(hand)).sort((a, b) => a - b)
      const pairValues = []
      for (let i=0; i<values.length - 1; i++) {
        if (values[i] === values[i+1]) {
          pairValues.push(values[i])
        }
      }
      return pairValues.sort((a, b) => a - b)[1]
    }

    const containsTwoPair = (hand) => {
      const sortedHand = hand.sort()
      const firstTwo = sortedHand.slice(0, 2)
      const lastThree = sortedHand.slice(2)
      const firstThree = sortedHand.slice(0, 3)
      const lastTwo = sortedHand.slice(3)
      if (containsPair(firstTwo) && containsPair(lastThree)) {
        return true
      } else if (containsPair(firstThree) && containsPair(lastTwo)) {
        return true
      } else {
        return false
      }
    }

    const containsThreeOfAKind = (hand) => {
      const values = handValues(sequencedHand(hand)).sort((a, b) => a - b)
      for (let i=0; i<values.length - 2; i++) {
        if (values[i] === values[i+1] && values[i] === values[i+2]) {
          return true
        }
      }
      return false
    }

    const containsFourOfAKind = (hand) => {
      const values = handValues(sequencedHand(hand)).sort((a, b) => a - b)
      for (let i=0; i<values.length - 3; i++) {
        if (values[i] === values[i+1] && values[i] === values[i+2] && values[i] === values[i+3]) {
          return true
        }
      }
      return false
    }

    const isFlush = (hand) => {
      if ([...new Set(suits(hand))].length === 1) {
        return true
      } else {
        return false
      }
    }

    const sequencedHand = (hand) => {
      return hand.map(card => {
        const splitCard = card.split('')
        if (splitCard[0] === 'J') {
          splitCard[0] = '11'
        } else if (splitCard[0] === 'Q') {
          splitCard[0] = '12'
        } else if (splitCard[0] === 'K') {
          splitCard[0] = '13'
        } else if (splitCard[0] === 'A') {
          splitCard[0] = '14'
        }
        return splitCard.join('')
      })
    }

    const isFullHouse = (hand) => {
      const values = handValues(sequencedHand(hand)).sort((a, b) => a - b)
      if (values[0] === values[1] && values[2] === values[3] && values[2] === values[4]){
        return true
      } else if (values[3] === values[4] && values[0] === values[1] && values[0] === values[2]) {
        return true;
      } else {
        return false;
      }
    }

    const isStraight = (hand) => {
      const sortedValues = handValues(sequencedHand(hand)).sort((a, b) => a - b)
      for (let i=1; i < sortedValues.length; i++) {
        if ((sortedValues[i] - 1) !== sortedValues[i-1]) {
          return false
        }
      }
      return true
    }

    const scoreHand = (hand) => {
      if (isStraight(hand) && isFlush(hand)) {
        return {
          score: 9,
          name: 'Straight Flush'
        }
      } else if (containsFourOfAKind(hand)) {
        return {
          score: 8,
          name: 'Four of a Kind'
        }
      } else if (isFullHouse(hand)) {
        return {
          score: 7,
          name: 'Full House'
        }
      }
       else if (isFlush(hand)) {
        return {
          score: 6,
          name: 'Flush'
        }
      } else if (isStraight(hand)) {
        return {
          score: 5,
          name: 'Straight'
        }
      } else if (containsThreeOfAKind(hand)) {
        return {
          score: 4,
          name: "Three of a Kind"
        }
      } else if (containsTwoPair(hand)) {
        return {
          score: 3,
          name: "Two Pair"
        }
      } else if (containsPair(hand)) {
        return {
          score: 2,
          name: "Pair"
        }
      } else {
        return {
          score: 1,
          name: 'High Card'
        }
      }
    }

    const findHigherCard = (firstHand, secondHand) => {
      const sortedFirstHand = handValues(sequencedHand(firstHand)).sort((a, b) => b - a)
      const sortedSecondHand = handValues(sequencedHand(secondHand)).sort((a, b) => b - a)

      let handIndex = 0
      const compareCards = (index) => {
        if (sortedFirstHand[index] > sortedSecondHand[index]){
          return firstHand
        } else if (sortedSecondHand[index] > sortedFirstHand[index]){
          return secondHand
        } else if (sortedFirstHand[index] === sortedSecondHand[index]) {
          return compareCards(index + 1)
        }
      }

      return compareCards(handIndex)
    }

    const checkWinner = () => {
      let winner
      let winningMessage
      if (scoreHand(this.state.hand1).score === scoreHand(this.state.hand2).score) {
          const score = scoreHand(this.state.hand1).score
          switch (score) {
            case 2:
            case 4:
            case 8:
              winner = findPair(this.state.hand1) > findPair(this.state.hand2) ? player1 : player2
              winningMessage = "Higher value " + scoreHand(this.state.hand1).name + " wins"
              break;
            case 3:
              winner = findHigherPair(this.state.hand1) > findHigherPair(this.state.hand2) ? player1 : player2
              winningMessage = "Highest pair is of a higher value"
              break;
            case 7:
              winner = findHigherPair(this.state.hand1) > findHigherPair(this.state.hand2) ? player1 : player2
              winningMessage = "Triple is of a higher value"
              break;
            default:
              winner = findHigherCard(this.state.hand1, this.state.hand2) === this.state.hand1 ? player1 : player2
              winningMessage = "High card breaks the tie"
          }
      } else if ((scoreHand(this.state.hand1).score > scoreHand(this.state.hand2).score)) {
        winner = player1
        winningMessage = scoreHand(this.state.hand1).name + " beats " + scoreHand(this.state.hand2).name
      } else {
        winner = player2
        winningMessage = scoreHand(this.state.hand2).name + " beats " + scoreHand(this.state.hand1).name
      }
      this.setState({
        winner,
        winningMessage
      })
    }

    const randomCard = (cards) => {
      return cards[Math.floor(Math.random()*cards.length)]
    }

    const dealCards = () => {
      this.setState({
        hand1: [randomCard(this.state.cards), randomCard(this.state.cards), randomCard(this.state.cards), randomCard(this.state.cards), randomCard(this.state.cards)],
        hand2: [randomCard(this.state.cards), randomCard(this.state.cards), randomCard(this.state.cards), randomCard(this.state.cards), randomCard(this.state.cards)],
        winner: null,
        winningMessage: ""
      })
    }

    return (
      <div>
        <div className="container" style={{marginTop: "25px", marginBottom: "25px"}}>
          <button type="button" className="btn btn-primary" onClick={() => dealCards()}>Deal!</button>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="jumbotron">
                <Hand player={player1} hand={this.state.hand1}/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="jumbotron">
                <Hand player={player2} hand={this.state.hand2}/>
              </div>
            </div>
          </div>
        </div>
        <div className="container" style={{marginTop: "25px", marginBottom: "25px"}}>
          {this.state.hand1.length > 0 &&
            <button type="button" className="btn btn-info" onClick={() => checkWinner(this.state.hand1, this.state.hand2)}>Check Winner</button>
          }
        </div>
        <div className="jumbotron" style={{margin: "20px"}}>
          {this.state.winner &&
            <>
            <h2>{this.state.winner} wins!</h2>
            <h3>{this.state.winningMessage}</h3>
            </>
          }
        </div>
      </div>
    )
  }
}

export default HandsContainer;
