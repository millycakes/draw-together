import React from 'react';
import avatar1 from "../assets/avatar/avatar1.png"
import avatar2 from "../assets/avatar/avatar2.png"
import avatar3 from "../assets/avatar/avatar4.png"
import avatar4 from "../assets/avatar/avatar4.png"
import avatar5 from "../assets/avatar/avatar5.png"
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

        // may not always log updated data -> setState() does not immediately mutate this.state but creates a pending state transition
        console.log("user data");
        console.log(user);
        console.log("joined " + joined);

    }


    function updateName(event) {
        setName(event.target.value);
    }

    function copyKey(){
        navigator.clipboard.writeText(hostKey)
    }

    return(
        <div className = "avatar-page" style={{height: '100vh'}}>
            <Link to = "/" className = "home-logo">DRAW TOGETHER</Link>
            <div className = "avatar">
                <p>You</p>
                <img src = {avatar2}/>
                <input className = "input" type = "text" placeholder = "Enter your name" onChange = {updateName}/>
            </div>
            <div className ="vl"></div>
            <div className = "avatar">
                <p>Copy the following key to invite your friend!</p>
                <p className = "input">{hostKey}</p>
                <button className = "copy-button" onClick = {copyKey}>Copy Room Key</button>
            </div>
            <button className = "back-button"><Link to = "/">Return</Link></button>
            <button className = "next-button" onClick = {hostJoin}><Link to = "/loading">Next</Link></button>
        </div>
    )
}