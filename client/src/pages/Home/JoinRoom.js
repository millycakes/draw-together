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

    let validKeyFormat = false;

    console.log("f" + key.length);
    if (key.length == 6 && key.match(/^[0-9a-z]+$/)){
        validKeyFormat = true;
    }


    //alphanumeric characters 6

    return(
        <form onSubmit = {handleSubmit}>
            <div className = "key-form">
                <p className = "enter-key">Enter key</p>
                <input className = "key-input" type = "text" placeholder = "A1B2C3" onChange = {handleChange}></input>
                <p className =  "key-format">{validKeyFormat ? "valid key format" : "invalid key format"}</p>
            </div>
            <button className = "large-button"><Link to = "/avatar">Join Room</Link></button>
        </form>
    )
}