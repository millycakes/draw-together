import React from "react";

export default function Tutorial ({mode}) {

    function getInstructions(){
        if (mode == "Canvas Swap"){
            return(
                <ol>
                    <li>You and your friend will begin drawing on different canvases</li>
                    <li>The canvases will swap every 1 minute and 30 seconds</li>
                    <li>This process will repeat for a total of four rounds</li>
                </ol>
            )
        }
        else if (mode == "Top Bottom"){
            return(
                <ol>
                    <li>You and your friend will each draw on either the top half of the canvas or the bottom half</li>
                    <li>You will not be able to see the other half of the drawing</li>
                    <li>The complete drawing will be revealed after five minutes</li>
                </ol>
            )
        }
    }

    return(
        <div>
            <p>TUTORIAL</p>
            <p>{mode}</p>
            {getInstructions()}
        </div>
    )
}

