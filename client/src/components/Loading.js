import React from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import pencil from "../assets/pencil-animation.gif"


export default function Loading ({user, twoready}) {

    const navigate = useNavigate();

    React.useEffect(() => {
        if (twoready && user.host) {
            navigate("/mode-selection");
        }
    }, [twoready])

    return(
        <div className = "loading" style={{height: '100vh' }}>
            <img style = {{width: "200px"}} src = {pencil} />
            <p> {user.host ? "Waiting for player..." : "Waiting for host to start the game..."} </p>
        </div>
    )
}

