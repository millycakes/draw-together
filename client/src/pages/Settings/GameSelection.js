import React from "react";
import { useNavigate } from "react-router-dom";
import swap from "../../assets/modes/canvasswap.png"
import together from "../../assets/modes/drawtogether.png"
import split from "../../assets/modes/topbottom.png"
import Logo from "../../components/Logo";
import "./settings.css"
import Button from "../../components/Button";

export default function GameSelection({setSelection,setMode,selection,twoready}) {

    const navigate = useNavigate();
    
    React.useEffect(() => {
        if (selection&&twoready) {
            navigate("/canvas");
        }
        else if (selection) {
            navigate("/loading")
        }
    }, [selection])

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

    function hostJoin (event){
        event.preventDefault();
    }

    return (
        <div className = "selection" style={{height: "100vh"}}>
            <Logo />
            <h2>Choose a game to play:</h2>
            <div className = "selection--options">
                <div className = "selection--option">
                    <p>Draw Together</p>
                    <img src = {together} alt = "Draw Together"/>
                    <p>Draw with your friend in real-time</p>
                    <Button text = "Select" variant = "round" onClick = {togetherSelection} />
                </div>
                <div className = "selection--option">
                    <p>Top Bottom</p>
                    <img src = {split} alt = "Top Bottom"/>
                    <p>Draw face and body separately to create a unique creature</p>
                    <Button text = "Select" variant = "round" onClick = {splitSelection}/>
                </div>
                <div className = "selection--option">
                    <p>Canvas Swap</p>
                    <img src ={ swap} alt = "Canvas Swap"/>
                    <p>Draw on a canvas and swap every 2 minutes</p>
                    <Button text = "Select" variant = "round" onClick = {swapSelection} />
                </div>  
            </div>
            <Button variant = "primary left" text = "Return" onClick = {() => navigate("/host-settings")}/>
        </div>
    )
}


 