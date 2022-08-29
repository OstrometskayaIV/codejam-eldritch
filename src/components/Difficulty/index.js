import './Difficulty.css';


function Difficulty(props) {
  const {difficulty, setDifficulty} = props;
    return (
      <div className="diffilty_container">
        <div className={'difficulty_btn ' + (difficulty === 1 ? 'active' : '')} onClick={() => setDifficulty(1)}>Очень лёгкий</div>
        <div className={'difficulty_btn ' + (difficulty === 2 ? 'active' : '')} onClick={() => setDifficulty(2)}>Лёгкий</div>
        <div className={'difficulty_btn ' + (difficulty === 3 ? 'active' : '')} onClick={() => setDifficulty(3)}>Средний</div>
        <div className={'difficulty_btn ' + (difficulty === 4 ? 'active' : '')} onClick={() => setDifficulty(4)}>Высокий</div>
        <div className={'difficulty_btn ' + (difficulty === 5 ? 'active' : '')} onClick={() => setDifficulty(5)}>Очень высокий</div>
      </div>
    );
  }
  
  export default Difficulty;