import React from "react";
import { useNavigate } from 'react-router-dom';
import pencil from "../../assets/pencil-animation.gif"
import Logo from "../../components/Logo";
import "./loading.css"

export default function Loading ({user, twoready, selection}) {

    const navigate = useNavigate();
        if (twoready && selection) {
            navigate("/canvas");
        }

    return(
        <div className = "loading" style={{height: '100vh' }}>
            <Logo />
            <img style = {{width: "200px"}} src = {pencil} />
            <p> {user.host ? "Waiting for player..." : "Waiting for host to start the game..."} </p>
        </div>
    )
}