import React, { useState, useEffect, Fragment } from 'react';
import CardAbstract from '../Card/CardAbstract'
import Button from '../Assets/Button'
import axios from 'axios'
import csvParser from 'csv-parse'
import DeckUpload from './DeckUpload';
import RiskContainer from '../Assets/RiskContainer'


/**
 * 1. CSV importation
 *  -- Eport import format from set settings
 * 2. Change integers to prototype without changing CSV
 */

 // 17 is greatest average


function Deck(props) {
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
        {title && <h2 class="Deck--title">{title}</h2>}
        <p className="Deck--no-cards">No Cards</p>

        {discardPile.length && ( <Button onClick={reshuffle}>Reshuffle</Button> )}

        {!discardPile.length && ( <DeckUpload onChange={uploadHandler} /> )}
        </div>
      </Fragment>
    )
  }

  if (tiled) {
    return (
    <Fragment>
    {title && <h2 className="Deck--title">{title}</h2>}

    <div className="Deck Deck--tiled">


      {cardPile.length && cardPile.map( card => <CardAbstract card={card} />)}

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

  if (type === "application/json") {

    reader.readAsText(file)
    reader.onload = ()=> jsonUpload(reader.result)
  }

  if (type === "text/csv") {

    reader.readAsBinaryString(file)
    reader.onload = ()=> csvUpload(reader.result)
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
  let items = []
  const columns = arr[0]

  arr.forEach((row, idx) => {

    if (idx !== 0) {
      let cardData = {}

      row.forEach((rowData, rowIdx) => {
        cardData[columns[rowIdx]] = rowData
      })

      items.push(cardData)
    }
  })

  return(items)

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

export default Deck;
