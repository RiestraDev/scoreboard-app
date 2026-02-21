
import React, { useState } from "react";
import HeaderMenu from "./HeaderMenu";

const Header = (props) => {
    const [headerTitle, setTitle] = useState(props.initialTitle ?? "Hello?");
    const [isEditing, setIsEditing] = useState(false);

    const handleFinishEditing = () => setIsEditing(false);

    return (
        <div className="App-header">
            {isEditing ? (
                <input
                    className="header-title-input"
                    type="text"
                    value={headerTitle}
                    onChange={(e) => setTitle(e.target.value)}
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
                <h1>{headerTitle}</h1>
            )}
            <HeaderMenu onEditTitle={() => setIsEditing(true)} onResetScores={props.onResetScores} />
        </div>
    );
};

export default Header;