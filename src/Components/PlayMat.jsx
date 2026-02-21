import React from "react";
import PlayerCard from './PlayerCard';
import AddPlayerCard from "./AddPlayerCard";

const PlayMat = ({ players, onAddPlayer, onRemovePlayer, onUpdateScore }) => {

    return (
        <div className="playMat">

            {/* Render existing players */}
            {players.map((player) => (
                <PlayerCard
                    key={player.id}
                    id={player.id}
                    name={player.name}
                    initialScore={player.score}
                    onDelete={() => onRemovePlayer(player.id)}
                    onScoreChange={(newScore) => onUpdateScore(player.id, newScore)}
                />
            ))}

            <AddPlayerCard onClick={onAddPlayer} />
        </div>
    );
};

export default PlayMat;