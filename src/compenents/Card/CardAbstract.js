import React from 'react'
import "../../styles/card.sass"
import HeroAbstract from './HeroAbstract'
import SituationAbstract from './SituationAbstract'


export default function CardAbstract({ card }) {
  const { type } = card
  const cards = {
    situation: <SituationAbstract card={card} />,
    hero: <HeroAbstract card={card} />
  }

  return (
    <section id="card" className={`card`}>
      {card && type && (cards[type.toLowerCase()])}
    </section>
  )
}