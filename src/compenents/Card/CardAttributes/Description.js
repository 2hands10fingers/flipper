import React from 'react';

export default function Description({description, abilities}) {

  return (
    <div className="card--description">
      <p>{description}</p>
      {(abilities && abilities.length &&

      <ul className="card--abilities">
        {abilities.map( i => (<li>{i}</li>))}
      </ul>

      )}
    </div>
  )
}