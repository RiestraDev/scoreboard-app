
import React, { useState } from "react";
import HeaderMenu from "./HeaderMenu";

const Header = (props) => {
    const [isEditing, setIsEditing] = useState(false);

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
                <h1>{props.headerTitle}</h1>
            )}
            <HeaderMenu 
                onEditTitle={() => setIsEditing(true)} 
                onResetScores={props.onResetScores} 
                onResetGame={props.onResetGame}
                onOpenSaveModal={props.onOpenSaveModal}
                onOpenLoadModal={props.onOpenLoadModal}
            />
        </div>
    );
};

export default Header;