import React from 'react'

export default function RiskContainer(props) {

  return (
    <div className="Deck--risk-container">
      <form>
        <input type="number" name="risk" onChange={e => props.onChange(e.target.value)} />
      </form>
    </div>
  )
}