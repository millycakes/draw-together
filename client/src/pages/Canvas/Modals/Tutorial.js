import React from "react";
import closeIcon from "../../../assets/icons/close.png"

export default function Tutorial ({mode, setTutOpen}) {

    function getInstructions(){
        if (mode === "Canvas Swap"){
            return(
                <ol>
                    <li>You and your friend will begin drawing on different canvases</li>
                    <br/>
                    <li>The canvases will swap every 1 minute and 30 seconds</li>
                    <br/>
                    <li>This process will repeat for a total of four rounds</li>
                </ol>
            )
        }
        else if (mode === "Top Bottom"){
            return(
                <ol>
                    <li>You and your friend will each draw on either the top half of the canvas or the bottom half</li>
                    <br/>
                    <li>You will not be able to see the other half of the drawing</li>
                    <br/>
                    <li>The complete drawing will be revealed after five minutes</li>
                </ol>
            )
        }
    }

    function closeDiv(){
        setTutOpen(false);
        console.log("Closed")

    }

    return(
        <div className = "modal--background" onclick = {closeDiv}>
            <div className = "tutorial">
                <button className = "modal--close" onClick = {closeDiv}>
                    <img alt = "close icon" src = {closeIcon}/>
                </button>
                <div className="tutorial--descrption">
                    <p className="body-small">TUTORIAL</p>
                    <h2 className="heading">{mode}</h2>
                </div>
                {getInstructions()}
            </div>
        </div>
    )
}

