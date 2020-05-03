import React, { useState, useEffect, Fragment } from 'react';
import CardAbstract from '../Card/CardAbstract'
import HeroAbstract from '../Card/HeroAbstract'
import Button from '../Assets/Button'
import axios from 'axios'
import csvParser from 'csv-parse'
import DeckUpload from './DeckUpload';
import RiskContainer from '../Assets/RiskContainer'

export default function Deck(props) {
  const [risk, setRisk] = useState()
  const [discardPile, setDiscardPile] = useState([])
  const [cardPile, setCardPile] = useState([])
  const [currentCard, setCurrentCard] = useState({})
  const [grab, setGrab] = useState(0)
  const [deckSettings, setDeckSettings] = useState(props)
  const {title, tiled} = deckSettings

  useEffect(()=>{
    if(grab) {
      getPile()
    }
  }, [])

  useEffect(()=> {
    if (cardPile.length > 0) {
      setCurrentCard(cardPile[cardPile.length - 1])
    }
  }, [cardPile])

  if (cardPile.length === 0) {
    return (
      <Fragment>
        <div className="Deck">
        {title && <h2 className="Deck--title">{title}</h2>}
        <p className="Deck--no-cards">No Cards</p>
        {discardPile.length > 0 && ( <Button onClick={reshuffle}>Reshuffle</Button> )}
        {!discardPile.length > 0 && ( <DeckUpload onChange={uploadHandler} /> )}
        </div>
      </Fragment>
    )
  }

  if (tiled) {
    return (
    <Fragment>
    <div className={`Deck Deck--tiled`}>
      {title && <h2 className="Deck--title">{title}</h2>}
      <div class="Deck--pile">
        {cardPile.length > 0 &&
        cardPile.map( (card,idx) => <HeroAbstract key={idx} card={card} />)}
      </div>
    </div>
    </Fragment>
    )
  }

  return (
    <Fragment>
      <div className="Deck">
        {title && <h2 className="Deck--title">{title}</h2>}
        <CardAbstract card={currentCard}/>
        {risk && <p>{risk}</p>}
        <Button onClick={nextCardHandler}>Discard</Button>
        <RiskContainer onChange={setRisk} />
      </div>
    </Fragment>
  );

function uploadHandler(e) {
  const file = e.target.files[0]
  const { type } = file
  let reader = new FileReader()

  switch (type) {
    case "application/json":
      reader.readAsText(file)
      reader.onload = ()=> jsonUpload(reader.result)
    break
    case "text/csv":
      reader.readAsBinaryString(file)
      reader.onload = ()=> csvUpload(reader.result)
    break
    default:
    alert("File type not supported!")
  }
}

function jsonUpload(input) {
  const json = JSON.parse(input)

  shuffleCards(json)
  setCardPile(json)
}

function csvUpload(input) {
    let output = []
    const parser = csvParser(input)

    parser.on('readable', ()=> {
      let record
      // eslint-disable-next-line
      while (record = parser.read()) {
        output.push(record)
      }
    })

    parser.on('end', () => {
      let pile = parseCSV(output)

      shuffleCards(pile)
      setCardPile(pile)
    })
}

function reshuffle() {
  let shuffledPile = discardPile.map( i => i)

  if (!discardPile.length) {
    alert("No cards are in the discard pile!")
    return
  }

  shuffleCards(shuffledPile)
  setDiscardPile([])
  setCardPile(shuffledPile)
}

function parseCSV(arr) {
  const columns = arr[0]
  const newItems = arr.reduce((items, row, idx)=>{

  if (idx !== 0) {
    const cardData = row.reduce((acc, val, index)=> {
    acc[columns[index]] = val
      return acc
    }, {})

    items.push(cardData)
    return items
  }

  return items

  }, [])

  return(newItems)
}

function nextCardHandler() {
  let newDeck = cardPile.slice()
  let discardedCard = newDeck.pop()
  let disPileCopy = discardPile.map(i => i)

  disPileCopy.push(discardedCard)
  setDiscardPile(disPileCopy)
  setCardPile(newDeck)
}


  function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  async function getPile() {
    axios('card-pile.json')
      .then( ({data}) => {
        let pile = data

        pile.reverse()
        shuffleCards(pile)
        setCardPile(pile)
      })
      .catch( e => console.log(e))
  }
}
