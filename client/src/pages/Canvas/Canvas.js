import React, { useRef } from "react"
import {Link} from "react-router-dom"
import pencil from "../../assets/tools/pencil.png"
import eraser from "../../assets/tools/eraser.png"
import eyedropper from "../../assets/tools/eyedropper.png"
import clear from "../../assets/tools/clear.png"

import downloadIcon from "../../assets/icons/download.png"
import backIcon from "../../assets/icons/back.png"
import helpIcon from "../../assets/icons/help.png"
import zoomIn from "../../assets/icons/zoom-in.png"
import zoomOut from "../../assets/icons/zoom-out.png"
import Countdown from "./Countdown"
import pencilCursor from "../../assets/cursors/pencil.png"
import eraserCursor from "../../assets/cursors/eraser.png"
import eyedropperCursor from "../../assets/cursors/eyedropper.png"

import bear from "../../assets/avatar/bear.png"
import cat from "../../assets/avatar/cat.png"

import ExitConfirmation from "./ExitConfirmation"
import Tutorial from "./Tutorial"

import "./game.css"

export default function Game ({mode, socket}) {  

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [tutOpen, setTutOpen] = React.useState(false);

  const [brush, setBrush] = React.useState(
    {
      strokeStyle: "rgb(79, 79, 79)",
      prevStrokeStyle: "rgb(79, 79, 79)",
      lineWidth: 5,
      tool: "pencil"
    }
  )

  React.useEffect(() => {
      const canvas = canvasRef.current;
      canvas.width = 500;
      canvas.height = 500;
      const ctx = canvas.getContext("2d");
  
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, 500, 500);

      ctx.lineCap = "round";
      ctx.strokeStyle = brush.strokeStyle;
      ctx.lineWidth = brush.lineWidth;

      ctxRef.current = ctx;
  },[])

  React.useEffect(() => {
    ctxRef.current.strokeStyle = brush.strokeStyle;
    ctxRef.current.lineWidth = brush.lineWidth;
  }, [brush])

  const startDrawing = ({nativeEvent}) => {
      const {offsetX, offsetY} = nativeEvent;

      ctxRef.current.beginPath();
      ctxRef.current.moveTo(offsetX, offsetY);
      ctxRef.current.lineTo(offsetX, offsetY);
      ctxRef.current.stroke();
      setIsDrawing(true);
      nativeEvent.preventDefault();
  };

  const draw = ({nativeEvent}) => {
      if (!isDrawing){
          return
      }
      const {offsetX, offsetY} = nativeEvent;
      ctxRef.current.lineTo(offsetX, offsetY);
      ctxRef.current.stroke();
      nativeEvent.preventDefault();
  }

  const stopDrawing = () => {
      ctxRef.current.closePath();
      setIsDrawing(false);
  }

  const [cursor, setCursor] = React.useState(pencilCursor);

  function updateTool(e){
    let tool = e.target.id;
    tool = tool.slice(7, tool.length);

    if (tool == "clear"){
      ctxRef.current.fillStyle = "white";
      ctxRef.current.fillRect(0, 0, 500, 500);
      return;
    }

    console.log("running two -> prev" + brush.tool + tool)

    setBrush(prev => ({
      ...prev,
      tool: tool
    }))


    //save current color when switching from a pencil to an eraser
    if (brush.tool == "pencil" && tool == "eraser"){
      setBrush(prev => ({
        ...prev,
        prevStrokeStyle: brush.strokeStyle,
        strokeStyle: "rgb(255, 255, 255)"
      }))
    }

    //go back to previous color when switching from an eraser to a pencil
    if (brush.tool == "eraser" && tool == "pencil"){
      setBrush(prev => ({
        ...prev,
        strokeStyle: brush.prevStrokeStyle
      }))
    }

    if (tool == "eraser"){
      setBrush(prev => ({
        ...prev,
        strokeStyle: "rgb(255, 255, 255)"
      }))
    }

    console.log(brush)


  }

  function updateColor(e){
    let color = window.getComputedStyle(e.target, null).getPropertyValue("background-color");
    setBrush(prev => ({
      ...prev,
      strokeStyle: color
    }))
  }

  function updateStroke(e){
    let stroke = e.target.value;
    setBrush(prev => ({
      ...prev,
      lineWidth: stroke
    }))
  }

  function downloadDrawing(){
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', 'CanvasAsImage.png');
    const canvasImage = canvasRef.current.toDataURL('image/png');
    let url = canvasImage.replace(/^data:image\/png/,'data:application/octet-stream');
    downloadLink.setAttribute('href', url);
    downloadLink.click();
  }

  function displayGameInfo(){
    console.log("mode" + mode)
    switch (mode){
      case "Draw Together":
        return null;
      case "Canvas Swap":
        return (
          <div>
            <p>Round 1/5</p>
            <p>/</p>
            <p>Swapping in: 01:22</p>
          </div>
        )
      case "Top Bottom":
        return (
          <p>Reveal in 01:23</p>
        )
    }
  }

  const [countdownComplete, setCountdownComplete] = React.useState(false);
  
	return (
    <div className = "canvas"  style={{height: '100vh' }}>
      {(mode != "Draw Together" && !countdownComplete) && <Countdown seconds = {3} setCountdownComplete = {setCountdownComplete}/>}
      <div className = "canvas--section">
        <Link to = "/">DRAW TOGETHER</Link>
        <div className="vl"/>
        <p>{mode}</p>
        <p>/</p>
        <p>{displayGameInfo()}</p>
      </div>
      <div className = "canvas--section">
        <img src = {bear} className = "small-avatar" alt = "avatar"/>
        <img src = {cat} className = "small-avatar" alt = "avatar"/>
        <div className = "vl"/>
        <button onClick={downloadDrawing}>Download<input type = "image"  src = {downloadIcon} className = "canvas--icon" /></button>
        {tutOpen && <Tutorial mode = {mode}/>}
        {(mode != "Draw Together") && <button onClick = {() => {setTutOpen(prev => !prev)}}>Tutorial
          <input type = "image"  src = {helpIcon} className = "canvas--icon" />
        </button>}
      </div>
      <div>
        <canvas className = "drawing-canvas"
          ref = {canvasRef}
          onMouseDown = {startDrawing}
          onMouseMove = {draw}
          onMouseUp = {stopDrawing}
          onMouseLeave = {stopDrawing}
        >
        </canvas>
        {(mode == "Canvas Swap") && <div id = "cover"><p>Player's Drawing</p></div>}
      </div>
      <div className = "canvas--section">
        <input type = "image" src = {backIcon} onClick = {() => {
          setModalOpen(true);
        }} />
        {modalOpen && <ExitConfirmation setOpenModal={setModalOpen} />}
      </div>
      <div className = "toolbox">
        <ul className = "tools" onClick = {updateTool}>
          <li><img id = "tools--pencil" alt = "pencil icon" src = {pencil}/></li>
          <li><img id = "tools--eraser" alt = "eraser icon" src = {eraser}/></li>
          <li><img id = "tools--eyedropper" alt = "eyedropper icon" src = {eyedropper}/></li>
          <li><img id = "tools--clear" alt = "clear icon" src = {clear}/></li>
        </ul>
        <hr className = "vertical"/>
        <div className = "stroke" onClick = {updateStroke}>
          <label htmlFor="stroke">Thickness</label>
          <input type="range" id="stroke" name="stroke" min="1" max="100"
          onChange={updateStroke}
          defaultValue = "5"
          />
        </div>
        <hr className = "vertical"/>
        <ul className = "palette" onClick = {updateColor}>
          <li id = "palette--pink"></li>
          <li id = "palette--red"></li>
          <li id = "palette--orange"></li>
          <li id = "palette--yellow"></li>
          <li id = "palette--green"></li>
          <li id = "palette--blue"></li>
          <li id = "palette--purple"></li>
          <li id = "palette--black"></li>
          <li id = "palette--white"></li>
        </ul>
      </div>
      <div className = "canvas--section">
        <div className = "canvas--icon-wrapper">
          <input type = "image"  src = {zoomIn} className = "canvas--icon"/>
        </div>
        <div className = "canvas--icon-wrapper">
          <p>100%</p>
        </div>
        <div className = "canvas--icon-wrapper">
          <input type = "image"  src = {zoomOut} className = "canvas--icon" />
        </div>
      </div>
    </div>
  )
};