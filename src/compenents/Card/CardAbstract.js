import React from 'react'
import "../../styles/card.sass"
import Title from './CardAttributes/Title'
import Image from './CardAttributes/Image'
import Descrition from './CardAttributes/Description'
import Type from './CardAttributes/Type'
import Roll from './CardAttributes/Roll'


export default function CardAbstract({card}) {
  const {title, description, roll, image, type} = card

  return (

  <section id="card" className="card">
      {card && (
      <>
      {title && <Title title={title}/>}
      {image && <Image image={image} title={title} />}
      {type && <Type type={type} />}
      {description && (<Descrition description={description}/>)}
      {roll && <Roll roll={roll}/>}
      </>

      )}

    </section>
    )


}