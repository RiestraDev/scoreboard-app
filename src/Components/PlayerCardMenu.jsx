import React, { useState, useRef, useEffect } from "react";

const PlayerCardMenu = ({ onDelete, onEditClick }) => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    // Click outside logic moved here
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showMenu && menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showMenu]);

    return (
        <div className="menu-container" ref={menuRef}>
            <button className="menu-btn" onClick={() => setShowMenu(!showMenu)}>
                ⋮
            </button>

            {showMenu && (
                <div className="menu-dropdown">
                    <button onClick={() => { 
                        onDelete(); 
                        setShowMenu(false); 
                    }}>
                        Delete Player
                    </button>
                    <button onClick={() => { 
                        onEditClick(); 
                        setShowMenu(false); 
                    }}>
                        Edit Name
                    </button>
                </div>
            )}
        </div>
    );
};

export default PlayerCardMenu;