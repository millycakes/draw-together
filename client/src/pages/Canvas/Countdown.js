import {useEffect, useRef, useState} from "react"
import React from "react"
import "./game.css"

export default function Countdown({seconds, setCountdownComplete}){
    const [countdown, setCountdown] = React.useState(seconds);
    const timerId = useRef();

    React.useEffect(() => {
        timerId.current = setInterval(() => {
            setCountdown(prev => prev-1);
        }, 1000)
        return () => clearInterval(timerId.current)
    }, [])
    
    React.useEffect(() => {
        if (countdown <= 0){
            clearInterval(timerId.current)
            setCountdownComplete(true)
        }
    }, [countdown])

    return(
        <div className = "countdown">
            <h1 className="countdown--value">{countdown}</h1>
        </div>
    )
}