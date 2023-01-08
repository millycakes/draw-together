import React from 'react';
import editIcon from "../../assets/icons/edit.png"
import AvatarSelection from './AvatarSelection';
import { useNavigate } from 'react-router-dom';
import "./settings.css"
import Logo from '../../components/Logo';
import Button from '../../components/Button';

export default function PlayerSettings({user, setUser, setJoined, playerKey, hostAvatar, setRetrieve, setHostAvatar, host}) {

    const[name, setName] = React.useState("");
    const [avatarSelection, setAvatarSelection] = React.useState(false);

    const navigate = useNavigate();

    function updateName(event) {
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
        navigate("/loading")
    }

    return(
        <div className = "settings" style={{height: '100vh'}}>
            <Logo />
            <div className = "settings--avatar">
                <div className = "settings--inner-wrapper">
                    <p>Playing With</p>
                    <img className = "avatar---avatar" src = {hostAvatar}/>
                    <p>{host.name!="player"?host.name:"Host"}</p>
                </div>
            </div>
            <div className ="settings--vl"></div>
            <div className = "settings--avatar">
                <div className = "settings--outer-wrapper">
                    <div className = "settings--inner-wrapper">
                        <p>You</p>
                        <button className = "settings--edit-icon" onClick = {() => setAvatarSelection(prev => !prev)}><img src = {editIcon}/></button>
                        <img className = "avatar---avatar" src = {user.avatar}/>
                        {avatarSelection && <AvatarSelection isHost = {false} setUser = {setUser} setAvatarSelection = {setAvatarSelection} setRetrieve = {setRetrieve} setHostAvatar = {setHostAvatar}/>}
                        <input className = "input" type = "text" placeholder = "Enter your name" onChange = {updateName}/>
                    </div>
                </div>
            </div>
            <Button variant = "primary left" text = "Return" onClick = {() => navigate("/")}/>
            <Button variant = "primary right" text = "Next" onClick = {playerJoin}/>
        </div>
    )
}