import React from 'react';

const Hand = (props) => {

  return (
    <div>
      <h1>{props.player.name}</h1>
        <div className="row">
          {props.hand.map(card => {
            return (
              <div className="col d-flex justify-content-center">
                <div className="card" style={{padding: "5px"}}>
                  <h3 className="card-title">{card}</h3>
                </div>
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default Hand;
