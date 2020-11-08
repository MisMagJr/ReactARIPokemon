import React from 'react'

const PokeCard = ({pokemon}) => {
    //TODO
    return (
        <div className="card text-center mx-auto" style={{"maxWidth" : "18rem"}} key={pokemon.id}>
        <div className="card-header"><b>{/*Name*/}</b></div>
        <div className="card-body">          
          <h6 className="card-subtitle mb-2 text-muted">Id: {}</h6>
          <h6 className="card-subtitle mb-2 text-muted">Height: {}</h6>
          <h6 className="card-subtitle mb-2 text-muted">Weight: {}</h6>
          <img src={null/*Front default sprite*/} />
          <img src={null/*Back default sprite*/} />
        </div>
      </div>
    )
};

export default PokeCard