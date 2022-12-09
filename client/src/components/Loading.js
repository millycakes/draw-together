import React from "react";
import { Navigate, useNavigate } from 'react-router-dom';



export default function Loading ({socket, user, twoready}) {

    const navigate = useNavigate();

    if (twoready) {
        navigate("/canvas");
    }

    return(
        <div>
            <img src = "https://i.imgur.com/00ZlPQ0.gif" />
            <p> {user.host ? "Waiting for player..." : "Waiting for host to start the game..."} </p>
        </div>
    )
}

