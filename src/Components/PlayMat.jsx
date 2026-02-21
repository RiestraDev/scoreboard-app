import React, { useState } from "react";
import PlayerCard from './PlayerCard';
import AddPlayerCard from "./AddPlayerCard";

const PlayMat = (props) => {

    const [players, setPlayers] = useState([
        { id: Date.now(), name: "Player 1", score: 0 }
    ]);

    const removePlayer = (id) => {
        // Filter keeps every player EXCEPT the one with the matching id
        setPlayers(players.filter(player => player.id !== id));
    };

    const addPlayer = () => {
        const newPlayer = {
            id: Date.now(), // Unique ID for the 'key' prop
            name: `Player ${players.length + 1}`,
            score: 0
        };
        setPlayers([...players, newPlayer]); // Add new player to the array
    };

    return (
        <div className="playMat">

            {/* Render existing players */}
            {players.map((player) => (
                <PlayerCard
                    key={player.id}
                    name={player.name}
                    initialScore={player.score}
                    onDelete={() => removePlayer(player.id)}
                />
            ))}

            <AddPlayerCard onClick={addPlayer} />
        </div>
    );
};

export default PlayMat;