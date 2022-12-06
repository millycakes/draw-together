import React, { useState } from 'react';
import "./index.css"
import avatar1 from "../../assets/avatar1.png"
import avatar2 from "../../assets/avatar2.png"
import avatar3 from "../../assets/avatar4.png"
import avatar4 from "../../assets/avatar4.png"
import avatar5 from "../../assets/avatar5.png"
import {Link, Routes, Route} from "react-router-dom"


export default function Avatar() {
    
    const [name, setName] = React.useState("");

    function handleChange(event) {
        setName(event.target.value);
        console.log(name);
    }

    return(
        <div className = "avatar-page" style={{height: '100vh'}}>
            <a href className = "home-logo"><Link to = "/">DRAW TOGETHER</Link></a>
            <div className = "avatar">
                <p>Playing With</p>
                <img src = {avatar1}/>
                <p>Emily W</p>
            </div>
            <div className ="vl"></div>
            <div className = "avatar">
                <p>You</p>
                <img src = {avatar2}/>
                <input className = "input" type = "text" placeholder = "Enter your name" onChange = {handleChange}/>
            </div>
            <button className = "back-button"><Link to = "/">Return</Link></button>
            <button className = "next-button"><Link to = "/loading">Next</Link></button>
        </div>
    )
}