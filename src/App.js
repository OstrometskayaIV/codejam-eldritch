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

  let endIntervalBlue = ancientCardData[0].blueCards;
  let endIntervalGreen = ancientCardData[0].greenCards;
  let endIntervalBrown = ancientCardData[0].brownCards;

  let mostEasyFirstStage = shuffleArray(mostEasyGreenCards.slice(startIntervalGreen, endIntervalGreen)
                                .concat(mostEasyBrownCards.slice(startIntervalBrown, endIntervalBrown))
                                .concat(mostEasyBlueCards.slice(startIntervalBlue, endIntervalBlue)));

  startIntervalGreen = ancientCardData[0].greenCards;
  endIntervalGreen = startIntervalGreen +  ancientCardData[1].greenCards;
  startIntervalBrown = ancientCardData[0].brownCards;
  endIntervalBrown = startIntervalBrown + ancientCardData[1].brownCards;
  startIntervalBlue = ancientCardData[0].blueCards;
  endIntervalBlue = startIntervalBlue + ancientCardData[1].blueCards;

  let mostEasySecondStage = shuffleArray(mostEasyGreenCards.slice(startIntervalGreen, endIntervalGreen)
                                 .concat(mostEasyBrownCards.slice(startIntervalBrown, endIntervalBrown))
                                 .concat(mostEasyBlueCards.slice(startIntervalBlue, endIntervalBlue)));

  startIntervalGreen = startIntervalGreen + ancientCardData[1].greenCards;
  endIntervalGreen = startIntervalGreen +  ancientCardData[2].greenCards;
  startIntervalBrown = startIntervalBrown + ancientCardData[1].brownCards;
  endIntervalBrown = startIntervalBrown + ancientCardData[2].brownCards;
  startIntervalBlue = startIntervalBlue + ancientCardData[1].blueCards;
  endIntervalBlue = startIntervalBlue + ancientCardData[2].blueCards;

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
  const [decks, setDecks] = useState(null);
  const [ancientCardData, setAncientCardData] = useState(null);
  const [currentStageIndex, setCurrentStageIndex] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);

  const shuffleCards = useCallback(() => {
    let ancientCardData = ancientsData.find(name => name.id == activeCard);
    let firstStage = ancientCardData[0];
    let secondStage = ancientCardData[1];
    let thirdStage = ancientCardData[2];
    let greenCount = firstStage.greenCards + secondStage.greenCards + thirdStage.greenCards;
    let brownCount = firstStage.brownCards + secondStage.brownCards + thirdStage.brownCards;
    let blueCount = firstStage.blueCards + secondStage.blueCards + thirdStage.blueCards;
    let finalDeck = [];
    setAncientCardData(ancientCardData);

    if (difficulty == 1) {
      finalDeck = mostEasyLevel(greenCount, brownCount, blueCount, ancientCardData);
    }
    if (difficulty == 2) {
      finalDeck = easyLevel(greenCount, brownCount, blueCount, ancientCardData);
    }
    if (difficulty == 3) {
      finalDeck = normalLevel(greenCount, brownCount, blueCount, ancientCardData);
    }
    if (difficulty == 4) {
      finalDeck = difficultLevel(greenCount, brownCount, blueCount, ancientCardData);
    }
    if (difficulty == 5) {
      finalDeck = mostDifficultLevel(greenCount, brownCount, blueCount, ancientCardData);
    }
    setDecks(finalDeck);

  }, [activeCard, difficulty]);

  const getNextCard = useCallback(() => {
    if (currentCard === null) {
      setCurrentCardIndex(0);
      setCurrentStageIndex(0);
      if (decks[0][0].color == 'green') {
        ancientCardData[0].greenCards =  ancientCardData[0].greenCards - 1;
        
      }
      if (decks[0][0].color == 'brown') {
        ancientCardData[0].brownCards =  ancientCardData[0].brownCards - 1;
      }
      if (decks[0][0].color == 'blue') {
        ancientCardData[0].blueCards =  ancientCardData[0].blueCards - 1;
      }
      setCurrentCard(decks[0][0]);
    } else if (decks[currentStageIndex] && decks[currentStageIndex][currentCardIndex + 1]) {
      setCurrentCard(decks[currentStageIndex][currentCardIndex + 1])
      setCurrentCardIndex(currentCardIndex + 1);
      if (decks[currentStageIndex][currentCardIndex + 1].color == 'green') {
        ancientCardData[currentStageIndex].greenCards =  ancientCardData[currentStageIndex].greenCards - 1;
      }
      else if (decks[currentStageIndex][currentCardIndex + 1].color == 'brown') {
        ancientCardData[currentStageIndex].brownCards =  ancientCardData[currentStageIndex].brownCards - 1;
      }
      else if (decks[currentStageIndex][currentCardIndex + 1].color == 'blue') {
        ancientCardData[currentStageIndex].blueCards =  ancientCardData[currentStageIndex].blueCards - 1;
      }
    }
    else if(decks[currentStageIndex+1] && decks[currentStageIndex+1][0]){
      setCurrentCard(decks[currentStageIndex+1][0])
      setCurrentStageIndex(currentStageIndex + 1);
      setCurrentCardIndex(0);
      if (decks[currentStageIndex+1][0].color == 'green') {
        ancientCardData[currentStageIndex+1].greenCards =  ancientCardData[currentStageIndex+1].greenCards - 1;
      }
      else if (decks[currentStageIndex+1][0].color == 'brown') {
        ancientCardData[currentStageIndex+1].brownCards =  ancientCardData[currentStageIndex+1].brownCards - 1;
      }
      else if (decks[currentStageIndex+1][0].color == 'blue') {
        ancientCardData[currentStageIndex+1].blueCards =  ancientCardData[currentStageIndex+1].blueCards - 1;
      }
    }
    
  }, [decks, currentCard, currentCardIndex, currentStageIndex, ancientCardData]);

  return (
    <div className="App">
      <Cards activeCard = {activeCard} setActiveCard = {setActiveCard} />
      {activeCard && <Difficulty difficulty = {difficulty} setDifficulty = {setDifficulty} />}
      {activeCard && difficulty && <Deck shuffleCards = {shuffleCards} decks = {decks} ancientCardData = {ancientCardData} getNextCard = {getNextCard} currentCard = {currentCard}/>}
    </div>
  );
}

export default App;

