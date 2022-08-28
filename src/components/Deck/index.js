import './Deck.css';


function Deck(props) {
const shuffleCards = props.shuffleCards;
const decks = props.decks;
const ancientCardData = props.ancientCardData;
const getNextCard = props.getNextCard;
const currentCard = props.currentCard;
console.log(currentCard)
    return (
      <div className='deck_container'>
        {
          decks == null ?  <div className='deck_btn' onClick={() => shuffleCards()}>Замешать колоду</div> : 
          <>
          <div className='stage_container'>
            <div className='deck_stage'>
              <span className='text_stage'>Этап I</span>
              <div className='dots_container'>
                <div className='dot green'>{ancientCardData[0].greenCards}</div>
                <div className='dot brown'>{ancientCardData[0].brownCards}</div>
                <div className='dot blue'>{ancientCardData[0].blueCards}</div>
              </div>
            </div>
            <div className='deck_stage'>
              <span className='text_stage'>Этап II</span>
              <div className='dots_container'>
                <div className='dot green'>{ancientCardData[1].greenCards}</div>
                <div className='dot brown'>{ancientCardData[1].brownCards}</div>
                <div className='dot blue'>{ancientCardData[1].blueCards}</div>
              </div>
            </div>
            <div className='deck_stage'>
              <span className='text_stage'>Этап III</span>
              <div className='dots_container'>
                <div className='dot green'>{ancientCardData[2].greenCards}</div>
                <div className='dot brown'>{ancientCardData[2].brownCards}</div>
                <div className='dot blue'>{ancientCardData[2].blueCards}</div>
              </div>
            </div>
          </div><div className='deck_shirt' onClick={() => getNextCard()}></div>
          </>
        }
        {
          currentCard == null ? <></> : 
        <div className='last_card' style={{
          backgroundImage: `url(${currentCard.cardFace})`
        }}></div>
        }
      </div>
    );
  }
  
  export default Deck;