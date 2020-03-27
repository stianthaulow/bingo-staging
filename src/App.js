import React, { useState } from "react";
import ItemBox from "./ItemBox";
import ColorPicker from "./ColorPicker";

const numColumns = 5;

const initialItems = [
  "Pinlig stillhet",
  "Stirrer på video av deg selv",
  "Jeg tror du er på mute",
  "Kan dere se skjermen min nå?",
  "Barnelyder i bakgrunnen",
  "Familiemedlem kommer inn i rommet",
  "Kan du mute mikrofonen din?",
  "Hører dere meg?",
  "Hallo? Hallo?",
  "Beklager, jeg har litt tekniske problemer",
  "Nei, den laster fortsatt",
  "Hvem var det som nettopp joina?",
  "Oi, sorry, jeg var på mute",
  "Hosting",
  "Beklager at jeg er sen, forrige møte varte litt lenger",
  "Vi hører deg, hører du oss?",
  "Vi ser ikke skjermen din",
  "Deler du?",
  "Å beklager, du først",
  "Jeg har et nytt møte nå, så jeg må gå",
  "Sender du ut det på mail etterpå?",
  "Glemmer at det er video; laang gjesp",
  "Er vi ferdige da?",
  "Kan vi parkere den?",
  "5min småprat mens man venter på siste deltaker"
]
  .sort(() => 0.5 - Math.random())
  .map((title, i) => ({
    key: i,
    selected: false,
    title
  }));

const Bingo = ({ clearBingo }) => (
  <div className="bingo-overlay" onClick={clearBingo}>
    <span>BINGO!</span>
  </div>
);

function App() {
  const [items, setItems] = useState(initialItems);
  const [hasBingo, setBingo] = useState(false);

  const checkForBingo = () => {
    let rows = Array(numColumns).fill(0);
    let cols = Array(numColumns).fill(0);
    let diag = Array(2).fill(0);
    items.forEach(item => {
      if (item.selected) {
        let row = Math.floor(item.key / numColumns);
        let col = item.key % numColumns;
        rows[row]++;
        cols[col]++;
        if (row === col) {
          diag[0]++;
        }
        if (row === numColumns - (col + 1)) {
          diag[1]++;
        }
      }
    });

    if (rows.includes(numColumns) || cols.includes(numColumns) || diag.includes(numColumns)) {
      setBingo(true);
    }
  };

  const handleItemClick = itemId => () => {
    toggleItem(itemId);
    checkForBingo();
  };
  const toggleItem = itemId => {
    const updatedItems = [...items];
    updatedItems[itemId].selected = !updatedItems[itemId].selected;
    setItems(updatedItems);
  };

  const clearItems = () => setItems(items.map(item => ({ ...item, selected: false })));

  const clearBingo = () => {
    setBingo(false);
    clearItems();
  };

  return (
    <>
      <ColorPicker />
      <div className="main-content">
        <div className="title">Møtebingo</div>

        <div className="card">
          {items.map((item, i) => (
            <ItemBox {...item} handleClick={handleItemClick(i)} />
          ))}
        </div>
        {hasBingo && <Bingo clearBingo={clearBingo} />}
      </div>
    </>
  );
}

export default App;
