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
            alert("end")
            setCountdownComplete(true)
        }
    }, [countdown])


    //div should be opacity 20 black
    return(
        <div>
            <h1>Countdown : {countdown}</h1>
        </div>
    )
}