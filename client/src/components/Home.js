import React from "react"
import "./style.css"
import logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom';

export default function Home ({allKeys, playerKey, setPlayerKey, setPlayerSocket, setRetrieveKeys}) {

    const navigate = useNavigate();

    function handleCreateSubmit(event){
        event.preventDefault();
        console.log("create room");
        navigate("/host-settings")
    }    

    function handleJoinSubmit(event) {
        event.preventDefault();

        if (validKey){
            console.log("join room");
            setPlayerSocket(true);
            navigate("/player-settings");
        }
        else{
            console.log("key invalid")
        }
    }

    function updateKey(event) {
        setPlayerKey((event.target.value).toUpperCase());
        setRetrieveKeys(true);
    }
    
    let validKey = false;

    if (allKeys.includes(playerKey)){
        validKey = true;
    }

    return(
        <div className = "home" style={{height: '100vh'}}>
            <div className = "home--background">
                <div className = "home--form">
                <img className = "home--logo" alt = "logo" src = {logo}/>
                <form onSubmit = {handleCreateSubmit}>
                    <p>Create your room to begin</p>
                    <button onClick = {handleCreateSubmit} className = "large-button">Create Room</button>
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
                            onChange = {updateKey}>
                        </input>
                    </div>
                    <button style = {{margin: "16px 0px"}} className = "large-button">Join Room</button>
                </form>
            </div>
            </div>
            
        </div>
    )
}