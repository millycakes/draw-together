import React from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import swap from "../assets/modes/canvasswap.png"
import together from "../assets/modes/drawtogether.png"
import split from "../assets/modes/topbottom.png"
import {Link} from "react-router-dom"


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

    function swapselection (event) {
        event.preventDefault();
        setSelection(true);
        setMode("Canvas Swap");
    }

    function togetherselection (event) {
        event.preventDefault();
        setSelection(true);
        setMode("Draw Together");
    }

    function splitselection (event) {
        event.preventDefault();
        setSelection(true);
        setMode("Top Bottom");
    }

    function hostJoin (event){
        event.preventDefault();
    }

    return (
        <div className = "selection">
            <button><img src={swap} alt="swap" onClick={swapselection} /></button>
            <button><img src={together} alt="together" onClick={togetherselection} /></button>
            <button><img src={split} alt="split" onClick={splitselection} /></button>
        </div>
    )
}


 