import React from 'react';

const Hand = (props) => {

  return (
    <div>
      <h1>{props.player}</h1>
        <div className="row">
          {props.hand.map(card => {
            return (
              <div className="col d-flex justify-content-center">
                <div className="card" style={{padding: "5px"}}>
                  {card.length === 3 ?
                    <h4 className="card-title">{card}</h4>
                    :
                    <h3 className="card-title">{card}</h3>
                  }                  
                </div>
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default Hand;
