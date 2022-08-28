import './AncientCard.css';
import ancients from '../Cards/Ancients';

function AncientCard(props) {
    return (
      <div className={'ancient_card ' + (props.isActive ? 'active' : '')} style={{
        backgroundImage: `url(${props.backgroundImage})`
      }} onClick={props.onClick}>
      </div>
    );
  }
  
  export default AncientCard;