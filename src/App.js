import { useState } from 'react';
import './App.css';

import Header from "./Components/Header";
import PlayMat from './Components/PlayMat';

function App() {
  const [players, setPlayers] = useState([
    { id: Date.now(), name: "Player 1", score: 0 }
  ]);

  const addPlayer = () => {
    const newPlayer = {
      id: Date.now(),
      name: `Player ${players.length + 1}`,
      score: 0
    };
    setPlayers([...players, newPlayer]);
  };

  const removePlayer = (id) => {
    setPlayers(players.filter(player => player.id !== id));
  };

  const updatePlayerScore = (id, score) => {
    setPlayers(players.map(player => 
      player.id === id ? { ...player, score } : player
    ));
  };

  const resetAllScores = () => {
    setPlayers(players.map(player => ({ ...player, score: 0 })));
  };

  return (
    <div className="App">
      <Header 
        initialTitle={"Enter Title Here"} 
        onResetScores={resetAllScores}
      />
      <main>
        <PlayMat 
          players={players}
          onAddPlayer={addPlayer}
          onRemovePlayer={removePlayer}
          onUpdateScore={updatePlayerScore}
        />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
