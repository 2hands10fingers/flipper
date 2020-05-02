import React, {useState} from 'react';
import Deck from './compenents/Deck/Deck'
import Button from './compenents/Assets/Button'

export default function App(props) {
  const [decks, setDecks] = useState([])
  const [settings, setSettings] = useState({})


  return (
    <section id="app">
      <h1>Heist Meisters</h1>
      <Button onClick={addDeck} >Add Deck</Button>
      <input type="checkbox" value={settings.tiled} name="tiled" onChange={addSettingHandler} />
      <input type="text"  value={settings.title} name="title" onChange={addSettingHandler} />
      <section className="Decks">
      {decks && decks.map( deck => (deck) )}
      </section>

    </section>
  )

  function addSettingHandler(e) {
    const { value, type, name, checked } =  e.target
    let setting = {}

    if (type === "checkbox") {
      setting[name] = checked
    } else {
      setting[name] = value
    }

    setSettings(Object.assign({...settings}, setting))
  }


  function addDeck() {
    setDecks([...decks, <Deck key={decks.length} {...settings}/>])
    setSettings([])
  }
}