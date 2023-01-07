import React from 'react';
import editIcon from "../assets/icons/edit.png"
import AvatarSelection from './AvatarSelection';
import {Link} from "react-router-dom"

export default function PlayerSettings({user, setUser, setJoined, playerKey, avatar}) {

    const[name, setName] = React.useState("");
    const [avatarSelection, setAvatarSelection] = React.useState(false);

    function handleChange(event) {
        setName(event.target.value);
    }

    function playerJoin(event) {
        event.preventDefault();

        const userData = {
            name: name,
            key: playerKey,
            host: false,
            avatar: user.avatar
        };

        setUser(userData);
        setJoined(true);
    }

    return(
        <div className = "avatar-page" style={{height: '100vh'}}>
            <Link to = "/" className = "logo">DRAW TOGETHER</Link>
            <div className = "avatar">
                <p>Playing With</p>
                <img className = "large-avatar" src = {user.avatar}/>
                <p>Host</p>
            </div>
            <div className ="vl"></div>
            <div className = "avatar">
                <p>You</p>
                <img className = "large-avatar" src = {user.avatar}/>
                <button onClick = {() => setAvatarSelection(prev => !prev)}><img src = {editIcon}/></button>
                {avatarSelection && <AvatarSelection setUser = {setUser} setAvatarSelection = {setAvatarSelection}/>}
                <input className = "input" type = "text" placeholder = "Enter your name" onChange = {handleChange}/>
            </div>
            <button className = "back-button"><Link to = "/">Return</Link></button>
            <button className = "next-button" onClick = {playerJoin}><Link to = "/loading">Next</Link></button>
        </div>
    )
}