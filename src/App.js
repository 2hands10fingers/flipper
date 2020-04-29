import React, { useState, useEffect, Fragment } from 'react';
import CardAbstract from './compenents/Card/CardAbstract'
// import axios from 'axios'
import csvParser from 'csv-parse'


/**
 * 1. CSV importation
 *  -- Eport import format from set settings
 * 2. Change integers to prototype without changing CSV
 */

 // 17 is greatest average


function App() {
  const [risk, setRisk] = useState()
  const [discardPile, setDiscardPile] = useState([])
  const [cardPile, setCardPile] = useState([])
  const [currentCard, setCurrentCard] = useState({})


  useEffect(()=> {
    if (cardPile.length > 0) {
      setCurrentCard(cardPile[cardPile.length - 1])
    }
  }, [cardPile])

  if (cardPile.length === 0) {
    return (
      <Fragment>
        <p className="App--no-cards">No Cards</p>

        {(discardPile.length) && (
        <div className="App--discard-button-container">
          <button className="App--discard-button" onClick={reshuffle}>Reshuffle</button>
        </div>
        )}

        {!discardPile.length && (
        <div className="App--file-input">
          <form>
            <input
              className="App--choose-file-btn"
              type="file"
              id="file"
              name="file"
              onChange={csvUpload}
            />
            <label htmlFor="file">Upload card CSV</label>
          </form>
        </div>
        )}
      </Fragment>
    )
  }

  return (
    <Fragment>
    <div className="App">
      <CardAbstract card={currentCard}/>
      {risk && <p>{risk}</p>}
      <div className="App--discard-button-container">
      <button className="App--discard-button" onClick={nextCardHandler}> Discard</button>
      </div>

      <div className="App--risk-container">
        <form>
          <input type="number" name="risk" onChange={(e)=> setRisk(e.target.value)} />
        </form>
      </div>
    </div>
    </Fragment>
  );

function csvUpload(e) {
  const csvFile = e.target.files[0]
  let reader = new FileReader()

  reader.readAsBinaryString(csvFile)
  reader.onload = () => {
    let output = []
    let input = reader.result
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

  // async function getPile() {
//     axios('card-pile.json')
//       .then( ({data}) => {
//         let pile = data

//         pile.reverse()
//         shuffleCards(pile)
//         setCardPile(pile)
//       })
//       .catch( e => console.log(e))
//   }

}

export default App;
