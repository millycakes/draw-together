import React, { useRef } from "react"

import downloadIcon from "../../assets/icons/download.png"
import backIcon from "../../assets/icons/back.png"
import eyeIcon from "../../assets/icons/eye.png"
import helpIcon from "../../assets/icons/help.png"
import zoomIn from "../../assets/icons/zoom-in.png"
import zoomOut from "../../assets/icons/zoom-out.png"
import Countdown from "./Countdown"
import Button from '../../components/Button';

import "./canvas.css"
import Palette from "./Palette"
import Logo from "../../components/Logo"
import FinalDrawing from "./FinalDrawing"
import ExitConfirmation from "./ExitConfirmation"
import Tutorial from "./Tutorial"

export default function Game ({mode, socket, player, host, user}) {  

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [tutOpen, setTutOpen] = React.useState(false);
  const [finalOpen, setFinalOpen] = React.useState(false);
  const [clear, setClear] = React.useState(false);

  const [brush, setBrush] = React.useState(
    {
      strokeStyle: "rgb(79, 79, 79)",
      prevStrokeStyle: "rgb(79, 79, 79)",
      lineWidth: 5,
      tool: "pencil",
      x: 0,
      y: 0
    }
  )
  
  React.useEffect(() => {
    if (clear){
      ctxRef.current.fillStyle = "white";
      ctxRef.current.fillRect(0, 0, 500, 500);
      setClear(false);

      socket.emit("clear", true);
    }
  }, [clear])

  React.useEffect(()=> {
    if (mode==="Top Bottom") {
      let random = Math.random()*2;
      if (random<1) {
        player.half = "top";
        host.half = "bottom";
      }
      else {
        player.half = "bottom";
        host.half = "top";
      }
    }
  })

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

      setBrush(prev => ({
        ...prev,
        x: offsetX,
        y: offsetY
      }))

      setIsDrawing(true);
      nativeEvent.preventDefault();
  };

  const draw = ({nativeEvent}) => {
      if (!isDrawing){
          return
      }

      const {offsetX, offsetY} = nativeEvent;

      drawLine(brush.x, brush.y, offsetX, offsetY)

      setBrush(prev => ({
        ...prev,
        x: offsetX,
        y: offsetY
      }))

      nativeEvent.preventDefault();
  }

  const stopDrawing = () => {
      ctxRef.current.closePath();
      setIsDrawing(false);
  }

  socket.on("drawing", function(data){
    let {x1, y1, x2, y2, color, stroke} = JSON.parse(data);
    drawLine(x1, y1, x2, y2, color, stroke, true)
  });

  socket.on("clear", function(data){
    setClear(false);
    ctxRef.current.fillStyle = "white";
    ctxRef.current.fillRect(0, 0, 500, 500);
  })

  function drawLine(x1, y1, x2, y2, color = brush.strokeStyle, stroke = brush.lineWidth, server = false){
  
    if (!server){
      socket.emit("drawing", JSON.stringify({x1, y1, x2, y2, color, stroke}));
    }

    ctxRef.current.beginPath();
    ctxRef.current.strokeStyle = color;
    ctxRef.current.lineCap = "round";
    ctxRef.current.lineWidth =  stroke;
    ctxRef.current.moveTo(x1, y1);
    ctxRef.current.lineTo(x2, y2);
    ctxRef.current.stroke();
    ctxRef.current.closePath()
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
      {(mode !== "Draw Together" && !countdownComplete) && <Countdown seconds = {3} setCountdownComplete = {setCountdownComplete}/>}
      <div className = "canvas--section-1">
        <Logo variant = "canvas canvas--vl"/>
        <p>{mode}</p>
        <p>{displayGameInfo()}</p>
      </div>
      <div className = "canvas--section-2">
        <div className = "canvas--avatars">
          <img src = {host.avatar} className = "avatar-small" alt = "avatar"/>
          <img src = {player.avatar} className = "avatar-small canvas--vl" alt = "avatar"/>
        </div>
        <div className = "canvas--buttons">
          {(mode !== "Draw Together") && <Button variant = "icon" text = "Tutorial" onClick = {() => {setTutOpen(prev => !prev)}} src = {helpIcon}/>}
          {tutOpen && <Tutorial mode = {mode} setTutOpen = {setTutOpen}/>}
          {mode == "Draw Together" && <Button variant = "icon" text = "Preview" onClick = {() => {setFinalOpen(prev => !prev)}} src = {eyeIcon}/>}
          {finalOpen && <FinalDrawing  player = {player} host = {host} mode = {mode} setFinalOpen = {setFinalOpen}/>}
          <Button variant = "icon pink" text = "Download" onClick = {downloadDrawing} src = {downloadIcon}/>
        </div>
      </div>
      <div className = "canvas--wrapper">
        <canvas className = "drawing--canvas"
          ref = {canvasRef}
          onMouseDown = {startDrawing}
          onMouseMove = {draw}
          onMouseUp = {stopDrawing}
          onMouseLeave = {stopDrawing}>
        </canvas>
        {(mode === "Top Bottom") && 
        <div className = {`canvas--cover ${user.host ? "top" : "bottom"}`}><p>Player's Drawing</p></div>}
        {(mode === "Top Bottom") &&
        <div className = "canvas--swap-avatars">
          <img src = {host.avatar} className = "avatar-small" alt = "avatar"/>
          <img src = {player.avatar} className = "avatar-small" alt = "avatar"/>
        </div>
        }
      </div>
      <div className = "canvas--section-3">
        <input type = "image" src = {backIcon} onClick = {() => {
          setModalOpen(true);
        }} />
        {modalOpen && <ExitConfirmation setOpenModal={setModalOpen} />}
      </div>
      <div className = "canvas--palette">
        <Palette brush = {brush} setBrush = {setBrush} setClear = {setClear}/>
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