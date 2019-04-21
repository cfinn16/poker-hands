import React from 'react';

const Hand = (props) => {

  return (
    <div>
      <h1>{props.player.name}</h1>
      <ul>
        {props.hand.map(card => {
          return <li>{card}</li>
        })}
      </ul>
    </div>
  )
}

export default Hand;
