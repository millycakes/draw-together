import React from "react";
import Button from "../../../components/Button";

export default function Intro ({user, mode, host, player}) {

    function getInstructions(){
        if (mode === "Draw Together"){
            return(
                <ol>
                    <li>Create fun drawings with your friend</li>
                    <br/>
                    <li>You and your friend will be able to see changes made to the canvas in real-time</li>
                </ol>
            )
        }
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

    return(
        <div className = "modal--background">
            <div className = "intro">
                <div className="intro--info">
                    <div className="intro--description">
                        <div className="intro--heading">
                            <p className="body-small">TUTORIAL</p>
                            <h2 className="heading">{mode}</h2>
                        </div>
                        {getInstructions()}
                    </div>
                    <div className="intro--vl"></div>
                    <div className="intro--player">
                        <p>Playing with</p>
                        <img src = {user === host ? player.avatar : host.avatar} className = "avatar---avatar" alt = "avatar"/>
                        <p>{user === host ? player.name : host.name}</p>
                    </div>
                </div>
                <div className="intro--buttons">
                    <p className="intro--prompts">Enable Prompts</p>
                    <Button text = "Start Game"/>
                </div>
            </div>
        </div>
    )
}

