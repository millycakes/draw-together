import React from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import pencil from "../assets/pencil-animation.gif"


export default function Loading ({user, twoready}) {

    const navigate = useNavigate();

    React.useEffect(() => {
        if (twoready) {
            navigate("/canvas");
        }
    }, [twoready])

    return(
        <div class = "loading" style={{height: '100vh' }}>
            <img style = {{width: "200px"}} src = {pencil} />
            <p> {user.host ? "Waiting for player..." : "Waiting for host to start the game..."} </p>
        </div>
    )
}

