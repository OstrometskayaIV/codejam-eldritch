import './App.css';
import Cards from './components/Cards'
import Deck from './components/Deck';
import Difficulty from './components/Difficulty';
import React, { useState } from 'react';

function App() {
  const [activeCard, setActiveCard] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  return (
    <div className="App">
      <Cards activeCard = {activeCard} setActiveCard = {setActiveCard} />
      {activeCard && <Difficulty difficulty = {difficulty} setDifficulty = {setDifficulty} />}
      {activeCard && difficulty && <Deck />}
    </div>
  );
}

export default App;

