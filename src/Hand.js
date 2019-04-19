import React from 'react';

const Hand = (props) => {
  const randomCard = (cards) => {
    return cards[Math.floor(Math.random()*cards.length)]
  }
  return (
    <div>
      <h1>{props.player.name}</h1>
      <ul>
        <li>{randomCard(props.cards)}</li>
        <li>{randomCard(props.cards)}</li>
        <li>{randomCard(props.cards)}</li>
        <li>{randomCard(props.cards)}</li>
        <li>{randomCard(props.cards)}</li>
      </ul>
    </div>
  )
}

export default Hand;
