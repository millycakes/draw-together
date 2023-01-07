import React, { useReducer } from "react";
import bear from "../assets/avatar/bear.png"
import duck from "../assets/avatar/duck.png"
import dog from "../assets/avatar/dog.png"
import sheep from "../assets/avatar/sheep.png"
import cat from "../assets/avatar/cat.png"

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
       <div>
           <button onClick={() => updateAvatar(bear)}><img className = "small-avatar" src = {bear}/></button>
           <button onClick={() => updateAvatar(duck)}><img className = "small-avatar" src = {duck}/></button>
           <button onClick={() => updateAvatar(dog)}><img className = "small-avatar" src = {dog}/></button>
           <button onClick={() => updateAvatar(sheep)}><img className = "small-avatar" src = {sheep}/></button>
           <button onClick={() => updateAvatar(cat)}><img className = "small-avatar" src = {cat}/></button>
       </div>
    )
}

