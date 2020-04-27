import React from 'react'
import "../../styles/card.sass"

export default function CardAbstract({card}) {
  const {title, description, roll, image} = card

  return ( <section id="card" className="card">

      {card && (
      <>
      <div className="card--title">{title}</div>

      <div className="card--pic-container">
        <img src={image} alt={title} className="card--img" />
      </div>

      <div className="card--type">
        <p>Situation</p>
      </div>

      <div className="card--description">
        <p>{description}</p>
      </div>

      <div className="card--roll"><span>{roll}</span></div>
      </>
      )}

    </section>
    )


}