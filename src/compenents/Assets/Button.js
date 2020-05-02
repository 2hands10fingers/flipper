import React from 'react'

export default function Button(props) {

  return (
    <div className="App--button-container">
      <button onClick={props.onClick}className="Deck--button">{props.children}</button>
    </div>
  )
}