
import React, { useState } from "react";
import HeaderMenu from "./HeaderMenu";

const Header = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingTarget, setIsEditingTarget] = useState(false);

    const handleTitleChange = (newTitle) => {
        props.onHeaderTitleChange(newTitle);
    };

    const handleFinishEditing = () => setIsEditing(false);

    return (
        <div className="App-header">
            {isEditing ? (
                <input
                    className="header-title-input"
                    type="text"
                    value={props.headerTitle}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleFinishEditing();
                        if (e.key === "Escape") {
                            setIsEditing(false);
                        }
                    }}
                    onBlur={handleFinishEditing}
                    autoFocus
                />
            ) : (
                <h1 onClick={() => setIsEditing(true)} style={{ margin: 0, cursor: 'text' }}>{props.headerTitle}</h1>
            )}
            {isEditingTarget ? (
                <input
                    className="header-target-input"
                    type="number"
                    value={props.targetScore}
                    onChange={(e) => props.setTargetScore(Number(e.target.value))}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") setIsEditingTarget(false);
                        if (e.key === "Escape") setIsEditingTarget(false);
                    }}
                    onBlur={() => setIsEditingTarget(false)}
                    autoFocus
                />
            ) : (
                <h4 onClick={() => setIsEditingTarget(true)} style={{ margin: 0, opacity: 0.85, cursor: 'text' }}>
                    Target Score: {props.targetScore > 0 ? props.targetScore : 'None'}
                </h4>
            )}
            <HeaderMenu 
                onEditTitle={() => setIsEditing(true)} 
                onEditTarget={() => setIsEditingTarget(true)}
                onResetScores={props.onResetScores} 
                onResetGame={props.onResetGame}
                onOpenSaveModal={props.onOpenSaveModal}
                onOpenLoadModal={props.onOpenLoadModal}
            />
        </div>
    );
};

export default Header;