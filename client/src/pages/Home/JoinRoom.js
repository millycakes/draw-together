import React, { useState } from 'react';
import {Link} from "react-router-dom";

export default function JoinRoom () {

    const [key, setKey] = React.useState("");
    
    function handleChange(event) {
        setKey(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log("Join room: " + key);
    }

    const validKeyFormat = true;

    return(
        <form onSubmit = {handleSubmit}>
            <div className = "key-form">
                <p className = "enter-key">Enter key</p>
                <input className = "key-input" type = "text" placeholder = "000-468" onChange = {handleChange}></input>
                <p className =  "key-format">{validKeyFormat ? "valid key format" : "invalid key format"}</p>
            </div>
            <button className = "large-button"><Link to = "/avatar">Join Room</Link></button>
        </form>
    )
}