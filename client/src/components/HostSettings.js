import React from 'react';
import avatar1 from "../assets/avatar1.png"
import avatar2 from "../assets/avatar2.png"
import avatar3 from "../assets/avatar4.png"
import avatar4 from "../assets/avatar4.png"
import avatar5 from "../assets/avatar5.png"
import {Link} from "react-router-dom"


export default function HostSettings(props) {

    const [name, setName] = React.useState("");
    const [hostKey, setHostKey] = React.useState("");

    const uuid = () => {
        let fin = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        for (let i = 0; i<6; i++) {
            fin+=chars.charAt(Math.floor(Math.random()*chars.length));
        }
        return fin;
    }    
    
    React.useEffect(() => {
        setHostKey(uuid());
        props.validKeys.push(hostKey);
        props.socket.emit("join_room", hostKey);
        console.log(hostKey);
    }, [])


    function hostJoin(event)  {
        event.preventDefault();
        if (name==="") {
            setName("Player 1");
        }
        const indData = {
            name: name,
            key: hostKey,
            host:true
        };
        props.setUser(indData);
        props.setJoinedRoom(true);
    }

    function handleChange(event) {
        setName(event.target.value);
        console.log(name);
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
                <input className = "input" type = "text" placeholder = "Enter your name" onChange = {handleChange}/>
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