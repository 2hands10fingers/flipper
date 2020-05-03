import React, { Fragment } from 'react'
import Title from './CardAttributes/Title'
import Image from './CardAttributes/Image'
import Descrition from './CardAttributes/Description'
import Type from './CardAttributes/Type'
import Roll from './CardAttributes/Roll'

export default function SituationAbstract({card}) {
  const { title, description, roll, image, type } = card

  return (
    <section className={`card card--${type}` }>
      <Title title={title}/>
      <Image image={image} title={title} />
      <Type type={type} />
      <Descrition description={description}/>
      <Roll roll={roll}/>
    </section>
  )
}