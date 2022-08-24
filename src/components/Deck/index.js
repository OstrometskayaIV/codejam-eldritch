import './Deck.css';


function Deck(props) {
const shuffleCards = props.shuffleCards;
    return (
      <div className="deck_container">
        <div className="deck_btn" onClick={() => shuffleCards()}>Замешать колоду</div>
      </div>
    );
  }
  
  export default Deck;