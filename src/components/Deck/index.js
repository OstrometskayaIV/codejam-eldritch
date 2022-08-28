import './Deck.css';


function Deck(props) {
const shuffleCards = props.shuffleCards;
const decks = props.decks;
console.log(decks)
    return (
      <div className='deck_container'>
        {
          decks == null ?  <div className='deck_btn' onClick={() => shuffleCards()}>Замешать колоду</div> : 
          <>
          <div className='stage_container'>
            <div className='deck_stage'>
              <span className='text_stage'>Этап I</span>
              <div className='dots_container'>
                <div className='dot green'></div>
                <div className='dot brown'></div>
                <div className='dot blue'></div>
              </div>
            </div>
            <div className='deck_stage'>
              <span className='text_stage'>Этап II</span>
              <div className='dots_container'>
                <div className='dot green'></div>
                <div className='dot brown'></div>
                <div className='dot blue'></div>
              </div>
            </div>
            <div className='deck_stage'>
              <span className='text_stage'>Этап III</span>
              <div className='dots_container'>
                <div className='dot green'></div>
                <div className='dot brown'></div>
                <div className='dot blue'></div>
              </div>
            </div>
          </div><div className='deck_shirt'></div>
          </>
        }
        <div className='last_card'></div>
      </div>
    );
  }
  
  export default Deck;