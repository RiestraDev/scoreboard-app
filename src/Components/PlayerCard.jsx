import React, { useState, useEffect } from "react";
import Button from './Button';
import PlayerCardMenu from './PlayerCardMenu';
import AvatarPicker from './AvatarPicker';

const PlayerCard = ({ id, name, initialScore = 0, avatarId = 1, onDelete, onScoreChange, onNameChange, onAvatarChange, targetScore = 0 }) => {
    const [score, setScore] = useState(initialScore);
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(name);
    const [isPickingAvatar, setIsPickingAvatar] = useState(false);

    // Sync local score state when initialScore prop changes
    useEffect(() => {
        setScore(initialScore);
    }, [initialScore]);

    const handleFinishEditing = () => {
        if (playerName !== name) {
            onNameChange?.(playerName);
        }
        setIsEditing(false);
    };

    const updateScore = (newScore) => {
        setScore(newScore);
        onScoreChange(newScore);
    };

    const iconNumbers = Array.from({ length: 18 }, (_, i) => i + 1);

    const isWinner = targetScore > 0 && score >= targetScore;

    return (
        <div className={"playerCard" + (isWinner ? " winner" : "") }>
            {isPickingAvatar ? (
                /* THE AVATAR PICKER UI */
                <AvatarPicker
                    onSelectAvatar={(num) => {
                        onAvatarChange?.(num);
                        setIsPickingAvatar(false);
                    }}
                    onCancel={() => setIsPickingAvatar(false)}
                />
            ) : (
                /* THE NORMAL CARD UI */
                <>
                    <div className="card-main">
                        <div className="avatar-placeholder">
                            {/* Replaced silhouette with dynamic image */}
                            <img
                                src={`/avatars/Icon_${avatarId}.png`}
                                alt="Current Avatar"
                                className="current-avatar"
                                onClick={() => setIsPickingAvatar(true)}
                                style={{ cursor: 'pointer' }}
                            />
                        </div>

                        <div className="score-display">
                            <div className="player-header">
                                {isEditing ? (
                                    <input
                                        className="player-name-input"
                                        type="text"
                                        value={playerName}
                                        onChange={(e) => setPlayerName(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleFinishEditing();
                                            if (e.key === 'Escape') {
                                                setPlayerName(name);
                                                setIsEditing(false);
                                            }
                                        }}
                                        onBlur={handleFinishEditing}
                                        autoFocus
                                    />
                                ) : (
                                    <h2 className="player-name">{playerName} {isWinner ? <span aria-hidden>👑</span> : null}</h2>
                                )}

                                <PlayerCardMenu
                                    onDelete={onDelete}
                                    onEditClick={() => setIsEditing(true)}
                                    onChangeAvatarClick={() => setIsPickingAvatar(true)} // Hooked up the picker
                                />
                            </div>

                            <span className="label">Score</span>
                            <h2 className="score-value">{score.toLocaleString()}</h2>
                        </div>
                    </div>

                    <div className="card-controls">
                        <Button label="- 10" onClick={() => updateScore(score - 10)} variant="danger" />
                        <Button label="- 1" onClick={() => updateScore(score - 1)} variant="danger" />
                        <Button label="+ 1" onClick={() => updateScore(score + 1)} variant="success" />
                        <Button label="+ 10" onClick={() => updateScore(score + 10)} variant="success" />
                    </div>
                </>
            )}
        </div>
    );
};
export default PlayerCard;