import './App.css';
import Cards from './components/Cards'
import Deck from './components/Deck';
import Difficulty from './components/Difficulty';

function App() {
  return (
    <div className="App">
      <Cards />
      <Difficulty />
      <Deck />
    </div>
  );
}

export default App;
