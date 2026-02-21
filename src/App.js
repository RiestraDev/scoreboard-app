import { useState, useEffect } from 'react';
import './App.css';

import Header from "./Components/Header";
import PlayMat from './Components/PlayMat';
import TemplateModals from './Components/TemplateModals';

function App() {
  // Initialize players from localStorage or use default
  const [players, setPlayers] = useState(() => {
    const saved = localStorage.getItem('scoreboard_players');
    return saved ? JSON.parse(saved) : [{ id: Date.now(), name: "Player 1", score: 0, avatarId: 1 }];
  });

  // Initialize header title from localStorage or use default
  const [headerTitle, setHeaderTitle] = useState(() => {
    const saved = localStorage.getItem('scoreboard_headerTitle');
    return saved ? saved : "Enter Title Here";
  });

  // Modal states
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);

  // Autosave players and headerTitle to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('scoreboard_players', JSON.stringify(players));
    localStorage.setItem('scoreboard_headerTitle', headerTitle);
  }, [players, headerTitle]);

  const addPlayer = () => {
    const newPlayer = {
      id: Date.now(),
      name: `Player ${players.length + 1}`,
      score: 0,
      avatarId: 1
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

  const updatePlayerName = (id, name) => {
    setPlayers(players.map(player => 
      player.id === id ? { ...player, name } : player
    ));
  };

  const updatePlayerAvatar = (id, avatarId) => {
    setPlayers(players.map(player => 
      player.id === id ? { ...player, avatarId } : player
    ));
  };

  const resetAllScores = () => {
    setPlayers(players.map(player => ({ ...player, score: 0 })));
  };

  const resetGame = () => {
    // Clear localStorage
    localStorage.removeItem('scoreboard_players');
    localStorage.removeItem('scoreboard_headerTitle');
    // Reset state to defaults
    setPlayers([{ id: Date.now(), name: "Player 1", score: 0, avatarId: 1 }]);
    setHeaderTitle("Enter Title Here");
  };

  // Save current board as template
  const saveTemplate = (templateName) => {
    const templates = JSON.parse(localStorage.getItem('scoreboard_templates') || '[]');
    const newTemplate = {
      id: Date.now(),
      name: templateName,
      title: headerTitle,
      players: players
    };
    templates.push(newTemplate);
    localStorage.setItem('scoreboard_templates', JSON.stringify(templates));
    setShowSaveModal(false);
  };

  // Load template
  const loadTemplate = (templateId) => {
    const templates = JSON.parse(localStorage.getItem('scoreboard_templates') || '[]');
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setHeaderTitle(template.title);
      setPlayers(template.players);
      setShowLoadModal(false);
    }
  };

  // Delete template
  const deleteTemplate = (templateId) => {
    const templates = JSON.parse(localStorage.getItem('scoreboard_templates') || '[]');
    const filtered = templates.filter(t => t.id !== templateId);
    localStorage.setItem('scoreboard_templates', JSON.stringify(filtered));
    // Force re-render by creating new state
    setShowLoadModal(false);
    setTimeout(() => setShowLoadModal(true), 0);
  };

  return (
    <div className="App">
      <Header 
        headerTitle={headerTitle}
        onHeaderTitleChange={setHeaderTitle}
        onResetScores={resetAllScores}
        onResetGame={resetGame}
        onOpenSaveModal={() => setShowSaveModal(true)}
        onOpenLoadModal={() => setShowLoadModal(true)}
      />
      <main>
        <PlayMat 
          players={players}
          onAddPlayer={addPlayer}
          onRemovePlayer={removePlayer}
          onUpdateScore={updatePlayerScore}
          onUpdateName={updatePlayerName}
          onUpdateAvatar={updatePlayerAvatar}
        />
      </main>
      
      <TemplateModals
        showSaveModal={showSaveModal}
        showLoadModal={showLoadModal}
        onCloseSaveModal={() => setShowSaveModal(false)}
        onCloseLoadModal={() => setShowLoadModal(false)}
        onSaveTemplate={saveTemplate}
        onLoadTemplate={loadTemplate}
        onDeleteTemplate={deleteTemplate}
      />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
