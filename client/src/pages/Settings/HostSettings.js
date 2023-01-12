import React from "react";
import { useNavigate } from "react-router-dom";

import editIcon from "../../assets/icons/edit.png"
import Button from "../../components/Button";
import Logo from "../../components/Logo";
import AvatarSelection from "./AvatarSelection";
import "./settings.css"

export default function HostSettings({user, setUser, setJoined, hostKey, setHostKey, setHostSocket, setRetrieve, setHostAvatar}) {

    const [name, setName] = React.useState("Player 1");
    const [avatarSelection, setAvatarSelection] = React.useState(false);

    const navigate = useNavigate();

    const uuid = () => {
        let fin = "";
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
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

        const userData = {
            name: name===""?"Player 1":name,
            key: hostKey,
            host: true,
            avatar: user.avatar
        };

        setUser(userData);
        setJoined(true);
        navigate("/mode-selection")
    }

    function updateName(event) {
        setName(event.target.value);
    }

    function copyKey(){
        navigator.clipboard.writeText(hostKey)
    }

    return(
        <div className = "settings" style={{height: "100vh"}}>
            <Logo />
            <div className = "settings--avatar">
                <div className = "settings--outer-wrapper">
                    <div className = "settings--inner-wrapper">
                        <p>You</p>
                        <button className = "settings--edit-icon" onClick = {() => setAvatarSelection(prev => !prev)}><img src = {editIcon}/></button>
                        <img className = "avatar---avatar" src = {user.avatar}/>
                        {avatarSelection && <AvatarSelection isHost = {true} setUser = {setUser} setAvatarSelection = {setAvatarSelection} setRetrieve = {setRetrieve} setHostAvatar = {setHostAvatar}/>}
                        <input className = "settings--input" type = "text" placeholder = "Enter your name" onChange = {updateName}/>
                    </div>
                </div>
            </div>
            <div className ="settings--vl"></div>
            <div className = "settings--key">
                <p className="body-large settings--key-copy">Copy the following key to invite your friend!</p>
                <p>{hostKey}</p>
                <Button text = "Copy Room Key" variant = "round" onClick = {copyKey}/>
            </div>
            <Button variant = "primary left" text = "Return" onClick = {() => navigate("/")}/>
            <Button variant = "primary right" text = "Next" onClick = {hostJoin}/>
        </div>
    )
}