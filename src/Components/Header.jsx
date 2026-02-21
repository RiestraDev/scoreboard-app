
import React, {useState} from "react";

const Header = (props) => {

    const[headerTitle, setTitle] = useState(props.initialTitle ?? "Hello?");

    return (
        <div>
            <h1 className="App-header">
                {props.initialTitle}
            </h1>
        </div>
    );

};

export default Header;