import React, { useState } from "react";
import Button from './Button';

const PlayerCard = ({ name, initialScore = 0, onDelete }) => {
    const [score, setScore] = useState(initialScore);
    const [showMenu, setShowMenu] = useState(false); // Menu toggle state

    return (
        <div className="playerCard">

            <div className="card-main">
                <div className="avatar-placeholder">
                    {/* This represents your silhouette sketch */}
                    <div className="silhouette"></div>
                </div>

                <div className="score-display">
                    <div className="player-header">
                        <h2 className="player-name">{name}</h2>
                        <div className="menu-container">
                            <button className="menu-btn" onClick={() => setShowMenu(!showMenu)}>
                                ⋮
                            </button>

                            {showMenu && (
                                <div className="menu-dropdown">
                                    <button onClick={onDelete}>Delete Player</button>
                                    <button>Edit Name</button>
                                </div>
                            )}
                        </div>
                    </div>

                    <span className="label">Score</span>
                    <h2 className="score-value">{score.toLocaleString()}</h2>
                </div>
            </div>


            <div className="card-controls">
                <Button label="- 10" onClick={() => setScore(prev => prev - 10)} variant="danger" />
                <Button label="- 1" onClick={() => setScore(prev => prev - 1)} variant="danger" />
                <Button label="+ 1" onClick={() => setScore(prev => prev + 1)} variant="success" />
                <Button label="+ 10" onClick={() => setScore(prev => prev + 10)} variant="success" />
            </div>

        </div>
    );
};
export default PlayerCard;