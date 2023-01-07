import React from 'react';
import {Link} from "react-router-dom"
import editIcon from "../assets/icons/edit.png"
import AvatarSelection from './AvatarSelection';


export default function HostSettings({user, setUser, setJoined, hostKey, setHostKey, setHostSocket, setRetrieve, setHostAvatar}) {

    const [name, setName] = React.useState("");
    const [avatarSelection, setAvatarSelection] = React.useState(false);

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
            host: true,
            avatar: user.avatar
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
                <img className = "large-avatar" src = {user.avatar}/>
                <button onClick = {() => setAvatarSelection(prev => !prev)}><img src = {editIcon}/></button>
                {avatarSelection && <AvatarSelection isHost = {true} setUser = {setUser} setAvatarSelection = {setAvatarSelection} setRetrieve = {setRetrieve} setHostAvatar = {setHostAvatar}/>}
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