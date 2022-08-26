import './App.css';
import Cards from './components/Cards'
import Deck from './components/Deck';
import Difficulty from './components/Difficulty';
import React, { useState, useCallback } from 'react';
import ancientsData from '../src/components/ancients';
import greenCardsAssets from './components/mythicCards/green';
import brownCardsAssets from './components/mythicCards/brown';
import blueCardsAssets from './components/mythicCards/blue';


//рандом
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
  return shuffleArray(mostEasyCards);
  
}

const getEasyCards = (cardCount, cardsAssets) => {
  const shuffleCardsAssets = shuffleArray(cardsAssets);
  let easyCards = shuffleCardsAssets.reduce((accumulator, currentValue) => {
  if (currentValue.difficulty !== 'hard' && accumulator.length < cardCount) {
    return accumulator.concat(currentValue);
  }
  return accumulator;
  }, []);
  return easyCards;
}

const getNormalCards = (cardCount, cardsAssets) => {
  const shuffleCardsAssets = shuffleArray(cardsAssets);
  let normalCards = shuffleCardsAssets.reduce((accumulator, currentValue) => {
  return accumulator.concat(currentValue);
  }, []);
  return normalCards;
}

const getDifficultCards = (cardCount, cardsAssets) => {
  const shuffleCardsAssets = shuffleArray(cardsAssets);
  let difficultCards = shuffleCardsAssets.reduce((accumulator, currentValue) => {
  if (currentValue.difficulty !== 'easy' && accumulator.length < cardCount) {
    return accumulator.concat(currentValue);
  }
  return accumulator;
  }, []);
  return difficultCards;
}

const getMostDifficultCards = (cardCount, cardsAssets) => {
  const shuffleCardsAssets = shuffleArray(cardsAssets);
  let mostDifficultCards = shuffleCardsAssets.reduce((accumulator, currentValue) => {
    if (currentValue.difficulty == 'hard' && accumulator.length < cardCount) {
      return accumulator.concat(currentValue);
    }
    return accumulator;
  }, []);
  if (cardCount > mostDifficultCards.length) {
    mostDifficultCards = shuffleCardsAssets.reduce((accumulator, currentValue) => {
      if (currentValue.difficulty == 'normal' && accumulator.length < cardCount) {
        return accumulator.concat(currentValue);
      }
      return accumulator;
    }, mostDifficultCards);
  }
  return shuffleArray(mostDifficultCards);
  
}

const getFinalDecks = (ancientCardData, mostEasyGreenCards, mostEasyBrownCards, mostEasyBlueCards) => {
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

  return [mostEasyFirstStage, mostEasySecondStage, mostEasyThirdStage];
}

const mostEasyLevel = (greenCount, brownCount, blueCount, ancientCardData) => {
  let mostEasyGreenCards = getSemiDeck(greenCount, greenCardsAssets);
  let mostEasyBrownCards = getSemiDeck(brownCount, brownCardsAssets);
  let mostEasyBlueCards = getSemiDeck(blueCount, blueCardsAssets);

  let result = getFinalDecks(ancientCardData, mostEasyGreenCards, mostEasyBrownCards,mostEasyBlueCards);
  console.log(result)
  return result;
}

const easyLevel = (greenCount, brownCount, blueCount, ancientCardData) => {
  let mostEasyGreenCards = getEasyCards(greenCount, greenCardsAssets);
  let mostEasyBrownCards = getEasyCards(brownCount, brownCardsAssets);
  let mostEasyBlueCards = getEasyCards(blueCount, blueCardsAssets);

  let result = getFinalDecks(ancientCardData, mostEasyGreenCards, mostEasyBrownCards,mostEasyBlueCards);
  console.log(result)
  return result;
}

const normalLevel = (greenCount, brownCount, blueCount, ancientCardData) => {
  let mostEasyGreenCards = getNormalCards(greenCount, greenCardsAssets);
  let mostEasyBrownCards = getNormalCards(brownCount, brownCardsAssets);
  let mostEasyBlueCards = getNormalCards(blueCount, blueCardsAssets);

  let result = getFinalDecks(ancientCardData, mostEasyGreenCards, mostEasyBrownCards,mostEasyBlueCards);
  console.log(result)
  return result;
}

const difficultLevel = (greenCount, brownCount, blueCount, ancientCardData) => {
  let mostEasyGreenCards = getDifficultCards(greenCount, greenCardsAssets);
  let mostEasyBrownCards = getDifficultCards(brownCount, brownCardsAssets);
  let mostEasyBlueCards = getDifficultCards(blueCount, blueCardsAssets);

  let result = getFinalDecks(ancientCardData, mostEasyGreenCards, mostEasyBrownCards,mostEasyBlueCards);
  console.log(result)
  return result;
}

const mostDifficultLevel = (greenCount, brownCount, blueCount, ancientCardData) => {
  let mostEasyGreenCards = getMostDifficultCards(greenCount, greenCardsAssets);
  let mostEasyBrownCards = getMostDifficultCards(brownCount, brownCardsAssets);
  let mostEasyBlueCards = getMostDifficultCards(blueCount, blueCardsAssets);

  let result = getFinalDecks(ancientCardData, mostEasyGreenCards, mostEasyBrownCards,mostEasyBlueCards);
  console.log(result)
  return result;
}


function App() {
  const [activeCard, setActiveCard] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const shuffleCards = useCallback(() => {
    let ancientCardData = ancientsData.find(name => name.id == activeCard);
    let firstStage = ancientCardData.firstStage;
    let secondStage = ancientCardData.secondStage;
    let thirdStage = ancientCardData.thirdStage;
    let greenCount = firstStage.greenCards + secondStage.greenCards + thirdStage.greenCards;
    let brownCount = firstStage.brownCards + secondStage.brownCards + thirdStage.brownCards;
    let blueCount = firstStage.blueCards + secondStage.blueCards + thirdStage.blueCards;
    if (difficulty == 1) {
      mostEasyLevel(greenCount, brownCount, blueCount, ancientCardData);
    }
    if (difficulty == 2) {
      easyLevel(greenCount, brownCount, blueCount, ancientCardData);
    }
    if (difficulty == 3) {
      normalLevel(greenCount, brownCount, blueCount, ancientCardData);
    }
    if (difficulty == 4) {
      difficultLevel(greenCount, brownCount, blueCount, ancientCardData);
    }
    if (difficulty == 5) {
      mostDifficultLevel(greenCount, brownCount, blueCount, ancientCardData);
    }

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

