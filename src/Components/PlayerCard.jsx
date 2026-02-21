import React, { useState, useRef, useEffect } from "react";
import Button from './Button';

const PlayerCard = ({ name, initialScore = 0, onDelete }) => {
    const [score, setScore] = useState(initialScore);
    const [showMenu, setShowMenu] = useState(false); // Menu toggle state

    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(name);

    const menuRef = useRef(null);

    const handleFinishEditing = () => {
        setIsEditing(false);
        setShowMenu(false);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            // If the menu is open AND the click was NOT inside the menuRef area...
            if (showMenu && menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
            if (event.key === "Escape") setShowMenu(false);
        };

        // Attach the listener to the whole document
        document.addEventListener("mousedown", handleClickOutside);

        // Clean up the listener when the component disappears (best practice!)
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showMenu]); // Re-run this logic whenever showMenu changes

    return (
        <div className="playerCard">

            <div className="card-main">
                <div className="avatar-placeholder">
                    {/* This represents your silhouette sketch */}
                    <div className="silhouette"></div>
                </div>

                <div className="score-display">
                    <div className="player-header">
                        <h2 className="player-name">
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={playerName}
                                    onChange={(e) => setPlayerName(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleFinishEditing();
                                        } else if (e.key === 'Escape') {
                                            setPlayerName(name); // Revert to the original name from props
                                            setIsEditing(false);
                                            setShowMenu(false);
                                        }
                                    }}
                                    onBlur={() => {
                                        handleFinishEditing();
                                    }} // Saves when you click away
                                    autoFocus
                                />
                            ) : (
                                <h2 className="player-name">{playerName}</h2>
                            )}
                        </h2>

                        <div className="menu-container" ref={menuRef}>
                            <button className="menu-btn" onClick={() => setShowMenu(!showMenu)}>
                                ⋮
                            </button>

                            {showMenu && (
                                <div className="menu-dropdown">
                                    <button onClick={onDelete}>Delete Player</button>
                                    <button onClick={() => {
                                        setIsEditing(true);
                                        setShowMenu(false);
                                    }
                                    }>Edit Name</button>
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