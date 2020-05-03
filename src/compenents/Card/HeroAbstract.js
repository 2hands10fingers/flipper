import React, { Fragment } from 'react'
import Title from './CardAttributes/Title'
import Image from './CardAttributes/Image'
import Descrition from './CardAttributes/Description'
import Type from './CardAttributes/Type'

export default function HeroAbstract({card}) {
  const {title, description, abilities, image, type} = card

  return (
    <section className={`card card--${type}` }>
      <Title title={title}/>
      <Image image={image} title={title} />
      <Type type={type} />
      <Descrition description={description} abilities={abilityHandler(abilities)} />
    </section>
  )
}

function abilityHandler(abs) {
  return abs !== undefined ? abs.split(',') : []
}