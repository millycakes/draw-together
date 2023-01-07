import React from "react";
import { useNavigate } from 'react-router-dom';
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
        <div className = "selection" style={{height: '100vh'}}>
            <Logo />
            <p>Choose a game to play:</p>
            <div className = "selection--options">
                <div className = "selection--option">
                    <p>Draw Together</p>
                    <img src = {together} alt = "Draw Together"/>
                    <Button text = "Select" variant = "round" onClick = {togetherSelection} />
                </div>
                <div className = "selection--option">
                    <p>Top Bottom</p>
                    <img src = {split} alt = "Top Bottom"/>
                    <Button text = "Select" variant = "round" onClick = {splitSelection}/>
                </div>
                <div className = "selection--option">
                    <p>Canvas Swap</p>
                    <img src ={ swap} alt = "Canvas Swap"/>
                    <Button text = "Select" variant = "round" onClick = {swapSelection} />
                </div>  
            </div>
            <Button variant = "primary left" text = "Return" onClick = {() => navigate("/host-settings")}/>
        </div>
    )
}


 