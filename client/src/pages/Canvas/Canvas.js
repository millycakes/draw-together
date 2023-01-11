import React, { useRef } from "react"

import downloadIcon from "../../assets/icons/download.png"
import backIcon from "../../assets/icons/back.png"
import eyeIcon from "../../assets/icons/eye.png"
import helpIcon from "../../assets/icons/help.png"
import zoomIn from "../../assets/icons/zoom-in.png"
import zoomOut from "../../assets/icons/zoom-out.png"

import Countdown from "./Countdown"
import Button from "../../components/Button";
import Palette from "./Palette"
import Logo from "../../components/Logo"
import FinalDrawing from "./FinalDrawing"
import ExitConfirmation from "./ExitConfirmation"
import Tutorial from "./Tutorial"

import "./canvas.css"
import "./modal.css"

export default function Game ({mode, socket, player, host, user}) {  

  /**
   * todo: 
   * reset host and player data for play again and quit
   * countdown not going down at the same time
   * -----stop players from drawing when the countdown is up
   * -----fix download issue
   * fix top/bottom cover assignment issue
   * -----fix clear issue
   * fix swap issue
   * clean up css
   * 
   */
  
  const [isDrawing, setIsDrawing] = React.useState(false);

  //open modals
  const [exitOpen, setExitOpen] = React.useState(false);
  const [tutOpen, setTutOpen] = React.useState(false);
  const [finalOpen, setFinalOpen] = React.useState(false);
  const [initialCountdown, setInitialCountdown] = React.useState(false);

  //game countdown
  const [countdown, setCountdown] = React.useState(10);
  const [countdownDisplay, setCountdownDisplay] = React.useState("");
  const [round, setRound] = React.useState(1);

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

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const timerId = useRef();

  //initialize game settings
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

  //initialize canvas
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

  //update brush
  React.useEffect(() => {
    ctxRef.current.strokeStyle = brush.strokeStyle;
    ctxRef.current.lineWidth = brush.lineWidth;
  }, [brush])

  //display countdown
  React.useEffect(() => {
    let minutes = Math.floor(countdown / 60);
    let extraSeconds = countdown % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;

    setCountdownDisplay( minutes + ":" + extraSeconds);
    
  }, [countdown])


  //countdown
  React.useEffect(() => {
    if (!initialCountdown){
      return;
    }
    
    if (mode === "Top Bottom"){
      setCountdown(90)
    }
    else if (mode === "Canvas Swap"){
      setCountdown(10);
    }

    timerId.current = setInterval(() => {
        setCountdown(prev => prev-1);
    }, 1000)
    return () => clearInterval(timerId.current)
  }, [initialCountdown])
  
  //handle countdown
  React.useEffect(() => {
    if (mode === "Top Bottom"){
      if (countdown <= 0){
          clearInterval(timerId.current)
          setFinalOpen(true);
      }
    }
    else if (mode === "Canvas Swap"){
      if (round > 4){
        return;
      }
      if (round === 4 && countdown === 0){
        clearInterval(timerId.current)
        setFinalOpen(true);
      }
      if (countdown <= 0 && round < 4){
        setRound(prev => prev+1)
        swapCanvas();
      }
    }
  }, [countdown])
  

  function swapCanvas(){
    socket.emit("swap", [user.key, user.host]);
  }
  
  const startDrawing = ({nativeEvent}) => {

    if (mode !== "Draw Together" && countdown <= 0){
      return;
    }

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

      if (mode !== "Draw Together" && countdown <= 0){
        return;
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
    if (isDrawing){
      ctxRef.current.closePath();
      setIsDrawing(false);
    }
  }

  function clearCanvas(gamemode, isHost, server = false){
    if (countdown == 0){return;}

    console.log("game mode " + gamemode)
    console.log("is host " + isHost)

    if (server){
      if (user.host == isHost){
        console.log("invalid clear request -> socket broadcasting back to sender")
        return;
      }
    }

    if (!server){
      socket.emit("clear", [gamemode, user.host]);
    }

    ctxRef.current.fillStyle = "white";

    if (gamemode !== "Top Bottom"){
      ctxRef.current.fillRect(0, 0, 500, 500);
      return;
    }

    else{
      if (!server){
        user.host ? ctxRef.current.fillRect(0, 250, 500, 250) : ctxRef.current.fillRect(0, 0, 500, 250);
      }
      else{
        user.host ? ctxRef.current.fillRect(0, 0, 500, 250) : ctxRef.current.fillRect(0, 250, 500, 250);
        return;
      }
    }
  }
  React.useEffect(() => {

    socket.on("clear", function(data){
      console.log("server request to clear canvas in " + data[0] + "; request from host: " + data[1])
      
      clearCanvas(data[0], data[1], true);
    })

    socket.on("ready_swap", ()=> {
      const canvasImage = canvasRef.current.toDataURL();
      socket.emit("swap_fin", [canvasImage, user.key]);
    })
    
    socket.on("swap", function(data){
      clearCanvas();
      var imageObj = new Image();
      imageObj.src = data;

      imageObj.onload = function(){
          ctxRef.current.drawImage(this, 0, 0); 
      };
      setCountdown(10);
    })

    socket.on("drawing", function(data){
      let {x1, y1, x2, y2, color, stroke} = JSON.parse(data);
      drawLine(x1, y1, x2, y2, color, stroke, true)
    });

  }, [])

  function drawLine(x1, y1, x2, y2, color = brush.strokeStyle, stroke = brush.lineWidth, server = false){
  
    if (!server && (mode !== "Canvas Swap")){
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

  function downloadDrawing(canvasRef){
    let downloadLink = document.createElement("a");
    downloadLink.setAttribute("download", "CanvasAsImage.png");
    const canvasImage = canvasRef.toDataURL("image/png");
    let url = canvasImage.replace(/^data:image\/png/,"data:application/octet-stream");
    downloadLink.setAttribute("href", url);
    downloadLink.click();
  }

  function displayGameInfo(){
    switch (mode){
      case "Draw Together":
        return <p>{mode}</p>;
      case "Canvas Swap":
        return (
          <div className="canvas--game-info">
            <p>{mode}</p>
            <p>/</p>
            <p>Round {round}/4</p>
            <p>/</p>
            {(!initialCountdown) && <p>Starting soon</p>}
            {(initialCountdown) && <p>Swapping in: {countdownDisplay}</p>}
          </div>
        )
      case "Top Bottom":
        return (
          <div className="canvas--game-info">
            <p>{mode}</p>
            <p>/</p>
            {(!initialCountdown) && <p>Starting soon</p>}
            {(initialCountdown) && <p>Reveal in: {countdownDisplay}</p>}
          </div>
        )
    }
  }

	return (
    <div className = "canvas"  style={{height: "100vh" }}>
      {(mode !== "Draw Together" && !initialCountdown) && <Countdown seconds = {3} setInitialCountdown = {setInitialCountdown}/>}
      <div className = "canvas--section-1">
        <Logo variant = "canvas canvas--vl"/>
        {displayGameInfo()}
      </div>
      <div className = "canvas--section-2">
        <div className = "canvas--avatars">
          <img src = {host.avatar} className = "avatar-small" alt = "avatar"/>
          <img src = {player.avatar} className = "avatar-small canvas--vl" alt = "avatar"/>
        </div>
        <div className = "canvas--buttons">
          {(mode !== "Draw Together") && <Button variant = "icon" text = "Tutorial" onClick = {() => {setTutOpen(prev => !prev)}} src = {helpIcon}/>}
          {tutOpen && <Tutorial mode = {mode} setTutOpen = {setTutOpen}/>}
          {mode === "Draw Together" && <Button variant = "icon" text = "Preview" onClick = {() => {setFinalOpen(prev => !prev)}} src = {eyeIcon}/>}
          {finalOpen && 
          <FinalDrawing  
            player = {player} 
            host = {host} 
            user = {user}
            canvas = {canvasRef.current}
            setFinalOpen = {setFinalOpen}
          />}
          <Button variant = "icon pink" text = "Download" onClick = {() => downloadDrawing(canvasRef.current)} src = {downloadIcon}/>
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
        <div className = {`canvas--cover ${user.host ? "top" : "bottom"}`}><p>Player"s Drawing</p></div>}
        {(mode === "Top Bottom") &&
        <div className = "canvas--swap-avatars">
          <img src = {host.avatar} className = "avatar-small" alt = "avatar"/>
          <img src = {player.avatar} className = "avatar-small" alt = "avatar"/>
        </div>
        }
      </div>
      <div className = "canvas--section-3">
        <input type = "image" alt = "back icon" src = {backIcon} onClick = {() => {
          setExitOpen(true);
        }} />
        {exitOpen && <ExitConfirmation setExitOpen = {setExitOpen} />}
      </div>
      <div className = "canvas--palette">
        <Palette brush = {brush} setBrush = {setBrush} clearCanvas = {() => clearCanvas(mode, user.host)}/>
      </div>
      <div className = "canvas--section-4">
        <div className = "canvas--icon-wrapper">
          <input type = "image"  alt = "zoom in icon" src = {zoomIn} className = "canvas--icon"/>
        </div>
        <div className = "canvas--icon-wrapper">
          <p>100%</p>
        </div>
        <div className = "canvas--icon-wrapper">
          <input type = "image" alt = "zoom out icon" src = {zoomOut} className = "canvas--icon" />
        </div>
      </div>
    </div>
  )
};