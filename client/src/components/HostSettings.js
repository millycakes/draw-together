import React from 'react';
import bear from "../assets/avatar/bear.png"
import cat from "../assets/avatar/cat.png"
import dog from "../assets/avatar/dog.png"
import duck from "../assets/avatar/duck.png"
import sheep from "../assets/avatar/sheep.png"
import {Link} from "react-router-dom"


export default function HostSettings({user, setUser, joined, setJoined, hostKey, setHostKey, setHostSocket}) {

    const [name, setName] = React.useState("");

    const uuid = () => {
        let fin = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        for (let i = 0; i<6; i++) {
            fin+=chars.charAt(Math.floor(Math.random()*chars.length));
        }
        return fin;
    }    
    
    React.useEffect(() => {
        let key = uuid();
        setHostKey(key);
        setHostSocket(true);
    },[])

    function hostJoin(event)  {
        event.preventDefault();

        console.log("host joining");
        if (name==="") {
            setName("Player 1");
        }
        const userData = {
            name: name,
            key: hostKey,
            host: true
        };
        setUser(userData);
        setJoined(true);
    }

    function updateName(event) {
        setName(event.target.value);
    }

    function copyKey(){
        navigator.clipboard.writeText(hostKey)
    }

    return(
        <div className = "avatar-page" style={{height: '100vh'}}>
            <Link to = "/" className = "logo">DRAW TOGETHER</Link>
            <div className = "avatar">
                <p>You</p>
                <img src = {cat}/>
                <input className = "input" type = "text" placeholder = "Enter your name" onChange = {updateName}/>
            </div>
            <div className ="vl"></div>
            <div className = "avatar">
                <p>Copy the following key to invite your friend!</p>
                <p className = "input">{hostKey}</p>
                <button className = "copy-button" onClick = {copyKey}>Copy Room Key</button>
            </div>
            <button className = "back-button"><Link to = "/">Return</Link></button>
            <button className = "next-button" onClick = {hostJoin}><Link to = "/mode-selection">Next</Link></button>
        </div>
    )
}