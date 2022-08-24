import './App.css';
import Cards from './components/Cards'
import Deck from './components/Deck';
import Difficulty from './components/Difficulty';
import React, { useState, useCallback } from 'react';
import ancientsData from '../src/components/ancients';
import greenCardsAssets from './components/mythicCards/green';
import brownCardsAssets from './components/mythicCards/brown';
import blueCardsAssets from './components/mythicCards/blue';

const shuffleArray = (array) =>{
  return array.sort(() => Math.random() - 0.5) 
}

const getSemiDeck = (cardCount, cardsAssets) => {
  const shuffleCardsAssets = shuffleArray(cardsAssets);
  let mostEasyCards = shuffleCardsAssets.reduce((accumulator, currentValue) => {
    if (currentValue.difficulty == 'easy' && accumulator.length < cardCount) {
      return accumulator.concat(currentValue);
    }
    return accumulator;
  }, []);
  if (cardCount > mostEasyCards.length) {
    mostEasyCards = shuffleCardsAssets.reduce((accumulator, currentValue) => {
      if (currentValue.difficulty == 'normal' && accumulator.length < cardCount) {
        return accumulator.concat(currentValue);
      }
      return accumulator;
    }, mostEasyCards);
  }
  return mostEasyCards;
}




const mostEasyLevel = (greenCount, brownCount, blueCount, ancientCardData) => {
  let mostEasyGreenCards = getSemiDeck(greenCount, greenCardsAssets);
  let mostEasyBrownCards = getSemiDeck(brownCount, brownCardsAssets);
  let mostEasyBlueCards = getSemiDeck(blueCount, blueCardsAssets);


  let startIntervalBlue = 0;
  let startIntervalGreen = 0;
  let startIntervalBrown = 0;

  let endIntervalBlue = ancientCardData.firstStage.blueCards;
  let endIntervalGreen = ancientCardData.firstStage.greenCards;
  let endIntervalBrown = ancientCardData.firstStage.brownCards;

  let mostEasyFirstStage = shuffleArray(mostEasyGreenCards.slice(startIntervalGreen, endIntervalGreen)
                                .concat(mostEasyBrownCards.slice(startIntervalBrown, endIntervalBrown))
                                .concat(mostEasyBlueCards.slice(startIntervalBlue, endIntervalBlue)));

  startIntervalGreen = ancientCardData.firstStage.greenCards;
  endIntervalGreen = startIntervalGreen +  ancientCardData.secondStage.greenCards;
  startIntervalBrown = ancientCardData.firstStage.brownCards;
  endIntervalBrown = startIntervalBrown + ancientCardData.secondStage.brownCards;
  startIntervalBlue = ancientCardData.firstStage.blueCards;
  endIntervalBlue = startIntervalBlue + ancientCardData.secondStage.blueCards;

  let mostEasySecondStage = shuffleArray(mostEasyGreenCards.slice(startIntervalGreen, endIntervalGreen)
                                 .concat(mostEasyBrownCards.slice(startIntervalBrown, endIntervalBrown))
                                 .concat(mostEasyBlueCards.slice(startIntervalBlue, endIntervalBlue)));

  startIntervalGreen = startIntervalGreen + ancientCardData.secondStage.greenCards;
  endIntervalGreen = startIntervalGreen +  ancientCardData.thirdStage.greenCards;
  startIntervalBrown = startIntervalBrown + ancientCardData.secondStage.brownCards;
  endIntervalBrown = startIntervalBrown + ancientCardData.thirdStage.brownCards;
  startIntervalBlue = startIntervalBlue + ancientCardData.secondStage.blueCards;
  endIntervalBlue = startIntervalBlue + ancientCardData.thirdStage.blueCards;

  let mostEasyThirdStage = shuffleArray(mostEasyGreenCards.slice(startIntervalGreen, endIntervalGreen)
                                .concat(mostEasyBrownCards.slice(startIntervalBrown, endIntervalBrown))
                                .concat(mostEasyBlueCards.slice(startIntervalBlue, endIntervalBlue)));
  //console.log(mostEasyGreenCards)

  console.log(mostEasyFirstStage)
  console.log(mostEasySecondStage)
  console.log(mostEasyThirdStage)



}

function App() {
  const [activeCard, setActiveCard] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const shuffleCards = useCallback(() => {
    let ancientCardData = ancientsData.find(name => name.id == activeCard);
    let firstStage = ancientCardData.firstStage;
    console.log(firstStage)
    let secondStage = ancientCardData.secondStage;
    let thirdStage = ancientCardData.thirdStage;
    let greenCount = firstStage.greenCards + secondStage.greenCards + thirdStage.greenCards;
    let brownCount = firstStage.brownCards + secondStage.brownCards + thirdStage.brownCards;
    let blueCount = firstStage.blueCards + secondStage.blueCards + thirdStage.blueCards;
    mostEasyLevel(greenCount, brownCount, blueCount, ancientCardData);
    

  }, [activeCard, difficulty]);
  return (
    <div className="App">
      <Cards activeCard = {activeCard} setActiveCard = {setActiveCard} />
      {activeCard && <Difficulty difficulty = {difficulty} setDifficulty = {setDifficulty} />}
      {activeCard && difficulty && <Deck shuffleCards = {shuffleCards} />}
    </div>
  );
}

export default App;

