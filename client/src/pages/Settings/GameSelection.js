import React from "react";
import { useNavigate } from "react-router-dom";
import swap from "../../assets/modes/canvasswap.png"
import together from "../../assets/modes/drawtogether.png"
import split from "../../assets/modes/topbottom.png"
import Logo from "../../components/Logo";
import "./settings.css"
import Button from "../../components/Button";

export default function GameSelection({setSelection,setMode,selection,twoready, setTwoReady}) {


    const navigate = useNavigate();
    
        if (selection&&twoready) {
            setSelection(false);
            setTwoReady(false);
            navigate("/canvas");
        }
        else if (selection) {
            navigate("/loading")
        }

    function swapSelection (event) {
        event.preventDefault();
        setSelection(true);
        setMode("Canvas Swap");
    }

    function togetherSelection (event) {
        event.preventDefault();
        setSelection(true);
        setMode("Draw Together");
    }

    function splitSelection (event) {
        event.preventDefault();
        setSelection(true);
        setMode("Top Bottom");
    }

    return (
        <div className = "selection" style={{height: "100vh"}}>
            <Logo />
            <h2>Choose a game to play:</h2>
            <div className = "selection--options">
                <div className = "selection--option">
                    <img src = {together} alt = "Draw Together"/>
                    <p className="body-large">Draw Together</p>
                    <p>Draw with your friend in real-time</p>
                    <Button text = "Select" variant = "round" onClick = {togetherSelection} />
                </div>
                <div className = "selection--option">
                    <img src = {split} alt = "Top Bottom"/>
                    <p className="body-large">Top Bottom</p>
                    <p>Draw face and body separately to create a unique creature</p>
                    <Button text = "Select" variant = "round" onClick = {splitSelection}/>
                </div>
                <div className = "selection--option">
                    <img src ={ swap} alt = "Canvas Swap"/>
                    <p className="body-large">Canvas Swap</p>
                    <p>Draw on a canvas and swap every 2 minutes</p>
                    <Button text = "Select" variant = "round" onClick = {swapSelection} />
                </div>  
            </div>
            <Button variant = "primary left" text = "Return" onClick = {() => navigate("/host-settings")}/>
        </div>
    )
}


 