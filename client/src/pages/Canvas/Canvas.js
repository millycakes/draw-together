import React, { useRef } from "react"

import downloadIcon from "../../assets/icons/download.png"
import backIcon from "../../assets/icons/back.png"
import eyeIcon from "../../assets/icons/eye.png"
import helpIcon from "../../assets/icons/help.png"
import zoomInIcon from "../../assets/icons/zoom-in.png"
import zoomOutIcon from "../../assets/icons/zoom-out.png"

import Countdown from "./Countdown"
import Button from "../../components/Button";
import Palette from "./Palette"
import Logo from "../../components/Logo"
import FinalDrawing from "./Modals/FinalDrawing"
import ExitConfirmation from "./Modals/ExitConfirmation"
import Tutorial from "./Modals/Tutorial"

import "./canvas.css"
import "./Modals/modal.css"

export default function Canvas ({mode, socket, player, host, user, readySwap, setReadySwap, url}) {  
  
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
      if (user.host) {
        socket.emit("split_half", random);
        if (random<1) {
          host.half = "top";
          player.half = "bottom";
        }
        else {
          host.half = "bottom";
          player.half = "top";
        }
      }
    }
  }, [mode]);

  React.useEffect(()=> {
    socket.on("split_half", (data)=> {
        if (data<1) {
          host.half = "top";
          player.half = "bottom";
        }
        else {
          host.half = "bottom";
          player.half = "top";
        }
    })
  }, []);

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
      setCountdown(10);
    }
    else if (mode === "Canvas Swap"){
      setCountdown(2);
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
      if (countdown === 0 && round < 4){
          swapCanvas();
        
      }
    }
  }, [countdown])
  

  function swapCanvas(){
    const canvasImage = canvasRef.current.toDataURL();
    socket.emit("swap", [canvasImage, user.key, user.host]);
  }
  
  const startDrawing = ({nativeEvent}) => {

    const {offsetX, offsetY} = nativeEvent;

    if (brush.tool == "eyedropper"){
      const color = ctxRef.current.getImageData(offsetX, offsetY, 1, 1).data;

      setBrush(prev => ({
        ...prev,
        strokeStyle: `RGB(${color[0]}, ${color[1]}, ${color[2]})`,
        tool: "pencil"
      }))
    }

    if (mode !== "Draw Together" && countdown <= 0){
      return;
    }   

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

  React.useEffect(()=> {
    
    if (readySwap) {
      socket.emit("swap_fin", [user.key, user.host]);
      setReadySwap(false);
    }
  }, [readySwap]);

  React.useEffect(()=> {
    socket.on("swap", (data)=> {
      const[link, ishost] = data;
      if (ishost!==user.host) {
      console.log(url);
      var imageObj = new Image();
      imageObj.src = link;
  
      imageObj.onload = function(){
          ctxRef.current.drawImage(this, 0, 0); 
      };
      setCountdown(10);
      setRound(prev => prev+1)
    }
    })}, [])
  

  React.useEffect(() => {

    socket.on("clear", function(data){
      console.log("server request to clear canvas in " + data[0] + "; request from host: " + data[1])
      
      clearCanvas(data[0], data[1], true);
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
    downloadLink.setAttribute("download", "draw-together.png");
    const canvasImage = canvasRef.toDataURL("image/png");
    let url = canvasImage.replace(/^data:image\/png/,"data:application/octet-stream");
    downloadLink.setAttribute("href", url);
    downloadLink.click();
  }

  function zoomIn(){
    console.log("zoom in")
  }

  function zoomOut(){
    console.log("zoom out")
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
          {(mode !== "Draw Together") && <Button variant = "icon" color = "grey" text = "Tutorial" onClick = {() => {setTutOpen(prev => !prev)}} src = {helpIcon}/>}
          {tutOpen && <Tutorial mode = {mode} setTutOpen = {setTutOpen}/>}
          {mode === "Draw Together" && <Button variant = "icon" color = "grey" text = "Preview" onClick = {() => {setFinalOpen(prev => !prev)}} src = {eyeIcon}/>}
          {finalOpen && 
          <FinalDrawing  
            player = {player} 
            host = {host} 
            user = {user}
            canvas = {canvasRef.current}
            setFinalOpen = {setFinalOpen}
          />}
          <Button variant = "icon" text = "Download" onClick = {() => downloadDrawing(canvasRef.current)} src = {downloadIcon}/>
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
        <div className = {`canvas--cover ${user.host ? host.half : player.half}`}><p>{`${user.host ? player.name : host.name}'s Drawing`}</p></div>}
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
          <button onClick = {zoomIn} className = "canvas--zoom">
            <img alt = "zoom in icon" src = {zoomInIcon}/>
          </button>
        </div>
        <div className = "canvas--icon-wrapper">
          <p>100%</p>
        </div>
        <div className = "canvas--icon-wrapper">
          <button onClick = {zoomOut} className = "canvas--zoom">
            <img alt = "zoom out icon" src = {zoomOutIcon} />
          </button>
        </div>
      </div>
    </div>
  )
};