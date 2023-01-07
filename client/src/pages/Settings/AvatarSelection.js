import React from "react";
import bear from "../../assets/avatar/bear.png"
import duck from "../../assets/avatar/duck.png"
import dog from "../../assets/avatar/dog.png"
import sheep from "../../assets/avatar/sheep.png"
import cat from "../../assets/avatar/cat.png"
import "./settings.css"

export default function AvatarSelection ({isHost, setUser, setAvatarSelection, setRetrieve, setHostAvatar}) {

    React.useEffect(() => {})
    function updateAvatar (avatar){
        if (isHost) {
            setRetrieve(true);
            setHostAvatar(avatar);
        }
        setUser(prev => ({
            ...prev,
            avatar: avatar
        }))
        setAvatarSelection(false)
    }

    return(
       <div className = "avatar">
           <button className = "avatar--selector" onClick={() => updateAvatar(bear)}><img className = "avatar-small" src = {bear}/></button>
           <button className = "avatar--selector" onClick={() => updateAvatar(duck)}><img className = "avatar-small" src = {duck}/></button>
           <button className = "avatar--selector" onClick={() => updateAvatar(dog)}><img className = "avatar-small" src = {dog}/></button>
           <button className = "avatar--selector" onClick={() => updateAvatar(sheep)}><img className = "avatar-small" src = {sheep}/></button>
           <button className = "avatar--selector" onClick={() => updateAvatar(cat)}><img className = "avatar-small" src = {cat}/></button>
       </div>
    )
}

