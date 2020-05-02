
import React from 'react'

export default function DeckUpload(props) {

  return (
    <div className="Deck--file-input">
      <form>
        <input
          className="Deck--choose-file-btn"
          type="file"
          id="file"
          name="file"
          onChange={props.onChange}
          />
        <label htmlFor="file">Upload Deck</label>
      </form>
  </div>
  )
}