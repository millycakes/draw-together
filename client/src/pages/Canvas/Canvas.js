import React, { useRef } from "react"

import downloadIcon from "../../assets/icons/download.png"
import backIcon from "../../assets/icons/back.png"
import helpIcon from "../../assets/icons/help.png"
import zoomIn from "../../assets/icons/zoom-in.png"
import zoomOut from "../../assets/icons/zoom-out.png"
import Countdown from "./Countdown"

import bear from "../../assets/avatar/bear.png"
import cat from "../../assets/avatar/cat.png"

import ExitConfirmation from "./ExitConfirmation"
import Tutorial from "./Tutorial"

import "./game.css"
import Palette from "./Palette"
import Logo from "../../components/Logo"

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
      <div className = "canvas--section-1">
        <Logo variant = "canvas"/>
        <div className = "vl"/>
        <p>{mode}</p>
        <p>{displayGameInfo()}</p>
      </div>
      <div className = "canvas--section-2">
        <img src = {bear} className = "small-avatar" alt = "avatar"/>
        <img src = {cat} className = "small-avatar" alt = "avatar"/>
        <div className = "vl"/>
        <button onClick={downloadDrawing}><img  src = {downloadIcon} className = "canvas--icon" />Download</button>
        {tutOpen && <Tutorial mode = {mode}/>}
        {(mode != "Draw Together") && 
        <button onClick = {() => {setTutOpen(prev => !prev)}}><img src = {helpIcon} className = "canvas--icon" />Tutorial</button>}
      </div>
      <div className = "canvas--canvas">
        <canvas className = "drawing-canvas"
          ref = {canvasRef}
          onMouseDown = {startDrawing}
          onMouseMove = {draw}
          onMouseUp = {stopDrawing}
          onMouseLeave = {stopDrawing}>
        </canvas>
        {(mode == "Canvas Swap") && <div id = "cover"><p>Player's Drawing</p></div>}
      </div>
      <div className = "canvas--section-3">
        <input type = "image" src = {backIcon} onClick = {() => {
          setModalOpen(true);
        }} />
        {modalOpen && <ExitConfirmation setOpenModal={setModalOpen} />}
      </div>
      <div className = "canvas--palette">
        <Palette brush = {brush}ctxRef={ctxRef} setBrush = {setBrush}/>
      </div>
      <div className = "canvas--section-4">
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