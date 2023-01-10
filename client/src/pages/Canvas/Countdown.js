import {useRef} from "react"
import React from "react"

export default function Countdown({seconds, setInitialCountdown}){
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
            setInitialCountdown(true)
        }
    }, [countdown])

    return(
        <div className = "countdown modal">
            <h1 className="countdown--value">{countdown}</h1>
        </div>
    )
}