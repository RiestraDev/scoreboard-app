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

  // Victory/target score (0 = none)
  const [targetScore, setTargetScore] = useState(() => {
    const saved = localStorage.getItem('scoreboard_targetScore');
    return saved ? Number(saved) : 0;
  });

  // Autosave players, headerTitle and targetScore to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('scoreboard_players', JSON.stringify(players));
    localStorage.setItem('scoreboard_headerTitle', headerTitle);
    localStorage.setItem('scoreboard_targetScore', String(targetScore));
  }, [players, headerTitle, targetScore]);

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
    localStorage.removeItem('scoreboard_targetScore');
    // Reset state to defaults
    setPlayers([{ id: Date.now(), name: "Player 1", score: 0, avatarId: 1 }]);
    setHeaderTitle("Enter Title Here");
    setTargetScore(0);
  };

  // Save current board as template (with scores reset to 0)
  const saveTemplate = (templateName) => {
    const templates = JSON.parse(localStorage.getItem('scoreboard_templates') || '[]');
    const playersWithZeroScores = players.map(player => ({ ...player, score: 0 }));
    const newTemplate = {
      id: Date.now(),
      name: templateName,
      title: headerTitle,
      players: playersWithZeroScores,
      targetScore: targetScore
    };
    templates.push(newTemplate);
    localStorage.setItem('scoreboard_templates', JSON.stringify(templates));
    setShowSaveModal(false);
  };

  // Save current game (with current scores)
  const saveGame = (gameName) => {
    const saves = JSON.parse(localStorage.getItem('scoreboard_saves') || '[]');
    const newSave = {
      id: Date.now(),
      name: gameName,
      title: headerTitle,
      players: players,
      targetScore: targetScore
    };
    saves.push(newSave);
    localStorage.setItem('scoreboard_saves', JSON.stringify(saves));
    setShowSaveModal(false);
  };

  // Load template
  const loadTemplate = (templateId) => {
    const templates = JSON.parse(localStorage.getItem('scoreboard_templates') || '[]');
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setHeaderTitle(template.title);
      setPlayers(template.players);
      if (typeof template.targetScore !== 'undefined') setTargetScore(Number(template.targetScore));
      setShowLoadModal(false);
    }
  };

  // Load saved game
  const loadGame = (gameId) => {
    const saves = JSON.parse(localStorage.getItem('scoreboard_saves') || '[]');
    const save = saves.find(s => s.id === gameId);
    if (save) {
      setHeaderTitle(save.title);
      setPlayers(save.players);
      if (typeof save.targetScore !== 'undefined') setTargetScore(Number(save.targetScore));
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

  // Delete saved game
  const deleteGame = (gameId) => {
    const saves = JSON.parse(localStorage.getItem('scoreboard_saves') || '[]');
    const filtered = saves.filter(s => s.id !== gameId);
    localStorage.setItem('scoreboard_saves', JSON.stringify(filtered));
    // Force re-render by creating new state
    setShowLoadModal(false);
    setTimeout(() => setShowLoadModal(true), 0);
  };

  return (
    <div className="App">
      <Header 
        headerTitle={headerTitle}
        onHeaderTitleChange={setHeaderTitle}
        targetScore={targetScore}
        setTargetScore={setTargetScore}
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
          targetScore={targetScore}
        />
      </main>
      
      <TemplateModals
        showSaveModal={showSaveModal}
        showLoadModal={showLoadModal}
        onCloseSaveModal={() => setShowSaveModal(false)}
        onCloseLoadModal={() => setShowLoadModal(false)}
        onSaveTemplate={saveTemplate}
        onSaveGame={saveGame}
        onLoadTemplate={loadTemplate}
        onLoadGame={loadGame}
        onDeleteTemplate={deleteTemplate}
        onDeleteGame={deleteGame}
      />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
