import React from 'react';
import bear from "../assets/avatar/bear.png"
import cat from "../assets/avatar/cat.png"
import dog from "../assets/avatar/dog.png"
import duck from "../assets/avatar/duck.png"
import sheep from "../assets/avatar/sheep.png"

import {Link} from "react-router-dom"

export default function PlayerSettings({user, setUser, joined, setJoined, playerKey}) {

    const[name, setName] = React.useState("");
   
    function handleChange(event) {
        setName(event.target.value);
    }

    function playerJoin(event) {
        event.preventDefault();

        const userData = {
            name: name,
            key: playerKey,
            host: false
        };

        setUser(userData);
        setJoined(true);
    }

    return(
        <div className = "avatar-page" style={{height: '100vh'}}>
            <Link to = "/" className = "logo">DRAW TOGETHER</Link>
            <div className = "avatar">
                <p>Playing With</p>
                <img src = {duck}/>
                <p>Host</p>
            </div>
            <div className ="vl"></div>
            <div className = "avatar">
                <p>You</p>
                <img src = {cat}/>
                <input className = "input" type = "text" placeholder = "Enter your name" onChange = {handleChange}/>
            </div>
            <button className = "back-button"><Link to = "/">Return</Link></button>
            <button className = "next-button" onClick = {playerJoin}><Link to = "/loading">Next</Link></button>
        </div>
    )
}