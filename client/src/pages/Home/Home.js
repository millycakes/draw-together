import React from "react"
import logo from "../../assets/logo.png"
import { useNavigate } from 'react-router-dom';
import "./home.css"
import Button from "../../components/Button";

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
        //handle error
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
                    <form onSubmit = {handleCreateSubmit} style = {{margin: "20px 0"}}>
                        <p>Create your room to begin</p>
                        <Button text = "Create Room" variant = "large" onClick = {handleCreateSubmit} />
                    </form>
                    <p className = "home--line-block"><span>or join an existing room</span></p>
                    <form onSubmit = {handleJoinSubmit}>
                        <div className = "home--key-form">
                            <p className = "enter-key">Enter key</p>
                            <input 
                                type = "text" 
                                placeholder = "A1B2C3" 
                                className = "home--key-input" 
                                name = "key"
                                onChange = {updateKey}>
                            </input>
                        </div>
                        <div style = {{margin: "16px 0px"}}>
                            <Button text = "Join Room" variant = "large" onClick = {handleJoinSubmit} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}