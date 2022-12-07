import React from "react"
import {Link} from "react-router-dom"

import "./style.css"
import logo from "../assets/logo.png"

export default function Home () {

    function handleCreateSubmit(event){
        event.preventDefault();
        console.log("Create room");
    }

    const [key, setKey] = React.useState("");
    
    function handleChange(event) {
        setKey((event.target.value).toUpperCase());
    }

    function handleJoinSubmit(event) {
        event.preventDefault()
        console.log("Join room: " + key);
    }

    let validKeyFormat = false;

    if (key.length === 6 && key.match(/^[0-9A-Z]+$/)){
        validKeyFormat = true;
    }

    return(
        <div className = "home" style={{height: '100vh'}}>
            <div className = "form">
                <img className = "logo" src = {logo}/>
                <form onSubmit = {handleCreateSubmit}>
                    <p>Create your room to begin</p>
                    <Link to = "/host-settings">      
                        <button className = "large-button">Create Room</button>
                    </Link>
                </form>
                <p className = "line-block"><span>or join an existing room</span></p>
                <form onSubmit = {handleJoinSubmit}>
                    <div className = "key-form">
                        <p className = "enter-key">Enter key</p>
                        <input 
                            type = "text" 
                            placeholder = "A1B2C3" 
                            className = "key-input" 
                            name = "key"
                            onChange = {handleChange}>
                        </input>
                        <p className =  "key-format">{validKeyFormat ? "valid key format" : "invalid key format"}</p>
                    </div>
                    <button className = "large-button"><Link to = "/player-settings">Join Room</Link></button>
                </form>
            </div>
        </div>
    )
}