import React from "react"
import {Link} from "react-router-dom"
import "./style.css"
import logo from "../assets/logo.png"


export default function Home (props) {

    const [playerKey, setPlayerKey] = React.useState("");

    function handleCreateSubmit(event){
        event.preventDefault();
        console.log("Create room");
    }    
    function handleChange(event) {
        setPlayerKey((event.target.value).toUpperCase());
    }

    //this function is not being called for some reason
    function handleJoinSubmit(event) {
        console.log("submitted");
        event.preventDefault();
        if (validKey) {
            props.socket.emit("join_room", playerKey);
            props.user.key = playerKey;
            props.user.host = false;
       }
    }

    //need to prevent user from moving forward if valid key is false

    let validKey = false;

    if (props.validKeys.includes(playerKey)){
        validKey = true;
    }

    return(
        <div className = "home" style={{height: '100vh'}}>
            <div className = "form">
                <img className = "logo" alt = "logo" src = {logo}/>
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
                        <p className =  "key-format">{validKey ? "valid key format" : "invalid key format"}</p>
                    </div>
                    <button className = "large-button"><Link to = "/player-settings">Join Room</Link></button>
                </form>
            </div>
        </div>
    )
}