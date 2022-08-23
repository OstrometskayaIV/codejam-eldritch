import './AncientCard.css';
import ancients from '../Cards/Ancients';

function AncientCard(props) {
    return (
      <div className="ancient_card" style={{
        backgroundImage: `url(${props.backgroundImage})`
      }}>
        AC
      </div>
    );
  }
  
  export default AncientCard;