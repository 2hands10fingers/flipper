import React, {Fragment} from 'react'
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
    <Fragment>
      {card && type && (cards[type.toLowerCase()])}
    </Fragment>
  )
}