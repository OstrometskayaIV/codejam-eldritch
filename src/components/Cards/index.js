import AncientCard from "../AncientCard";
import './Cards.css';
import ancients from './Ancients';



function Cards(props) {
    const activeCard = props.activeCard;
    const setActiveCard = props.setActiveCard;
    return (
      <div className="cards_container">
        <AncientCard backgroundImage={ancients.azathoth} onClick={() => setActiveCard('azathoth')} isActive={activeCard === 'azathoth'}/>
        <AncientCard backgroundImage={ancients.cthulhu} onClick={() => setActiveCard('cthulhu')} isActive={activeCard === 'cthulhu'}/>
        <AncientCard backgroundImage={ancients.iogSothoth} onClick={() => setActiveCard('iogSothoth')} isActive={activeCard === 'iogSothoth'}/>
        <AncientCard backgroundImage={ancients.shubNiggurath} onClick={() => setActiveCard('shubNiggurath')} isActive={activeCard === 'shubNiggurath'}/>
      </div>
    );
  }
  
  export default Cards;

