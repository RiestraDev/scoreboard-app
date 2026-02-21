import React from "react";
import PlayerCard from './PlayerCard';
import AddPlayerCard from "./AddPlayerCard";

const PlayMat = ({ players, onAddPlayer, onRemovePlayer, onUpdateScore, onUpdateName, onUpdateAvatar }) => {

    return (
        <div className="playMat">

            {/* Render existing players */}
            {players.map((player) => (
                <PlayerCard
                    key={player.id}
                    id={player.id}
                    name={player.name}
                    initialScore={player.score}
                    avatarId={player.avatarId}
                    onDelete={() => onRemovePlayer(player.id)}
                    onScoreChange={(newScore) => onUpdateScore(player.id, newScore)}
                    onNameChange={(newName) => onUpdateName(player.id, newName)}
                    onAvatarChange={(newAvatarId) => onUpdateAvatar(player.id, newAvatarId)}
                />
            ))}

            <AddPlayerCard onClick={onAddPlayer} />
        </div>
    );
};

export default PlayMat;