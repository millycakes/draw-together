import React from 'react';
import avatar1 from "../assets/avatar/avatar1.png"
import avatar2 from "../assets/avatar/avatar2.png"
import avatar3 from "../assets/avatar/avatar4.png"
import avatar4 from "../assets/avatar/avatar4.png"
import avatar5 from "../assets/avatar/avatar5.png"
import {Link} from "react-router-dom"

export default function PlayerSettings({user, setUser, joined, setJoined, playerKey}) {

    const[name, setName] = React.useState("");
   
    function handleChange(event) {
        setName(event.target.value);
    }

    function playerJoin(event) {
        event.preventDefault();

        // if (name==="") {
        //     setName("Player 2");
        // }

        const userData = {
            name: name,
            key: playerKey,
            host: false
        };

        setUser(userData);
        setJoined(true);

        // may not always log updated data -> setState() does not immediately mutate this.state but creates a pending state transition
        console.log("user data");
        console.log(user);
        console.log("joined " + joined);
    }

    return(
        <div className = "avatar-page" style={{height: '100vh'}}>
            <Link to = "/" className = "home-logo">DRAW TOGETHER</Link>
            <div className = "avatar">
                <p>Playing With</p>
                <img src = {avatar1}/>
                <p>Host</p>
            </div>
            <div className ="vl"></div>
            <div className = "avatar">
                <p>You</p>
                <img src = {avatar2}/>
                <input className = "input" type = "text" placeholder = "Enter your name" onChange = {handleChange}/>
            </div>
            <button className = "back-button"><Link to = "/">Return</Link></button>
            <button className = "next-button" onClick = {playerJoin}><Link to = "/loading">Next</Link></button>
        </div>
    )
}