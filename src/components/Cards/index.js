import AncientCard from "../AncientCard";
import './Cards.css';
import ancients from './Ancients'

function Cards() {
    return (
      <div className="cards_container">
        <AncientCard backgroundImage={ancients.azathoth}/>
        <AncientCard backgroundImage={ancients.cthulhu}/>
        <AncientCard backgroundImage={ancients.iogSothoth}/>
        <AncientCard backgroundImage={ancients.shubNiggurath}/>
      </div>
    );
  }
  
  export default Cards;