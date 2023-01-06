import React, { useRef } from "react"
import {Link} from "react-router-dom"
import pencil from "../assets/tools/pencil.png"
import eraser from "../assets/tools/eraser.png"
import eyedropper from "../assets/tools/eyedropper.png"
import clear from "../assets/tools/clear.png"

import downloadIcon from "../assets/icons/download.png"
import backIcon from "../assets/icons/back.png"
import helpIcon from "../assets/icons/help.png"
import zoomIn from "../assets/icons/zoom-in.png"
import zoomOut from "../assets/icons/zoom-out.png"

import pencilCursor from "../assets/cursors/pencil.png"
import eraserCursor from "../assets/cursors/eraser.png"
import eyedropperCursor from "../assets/cursors/eyedropper.png"

import bear from "../assets/avatar/bear.png"
import cat from "../assets/avatar/cat.png"

import ExitConfirmation from "./ExitConfirmation"
import Tutorial from "./Tutorial"

export default function Canvas ({mode, socket}) {
  

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [tutOpen, setTutOpen] = React.useState(false);


  const [brush, setBrush] = React.useState(
    {
      strokeStyle: "rgb(79, 79, 79)",
      lineWidth: 5
    }
  )

  React.useEffect(() => {
      const canvas = canvasRef.current;
      canvas.width = 500;
      canvas.height = 500;
      const context = canvas.getContext("2d");
  
      context.lineCap = "round";
      context.strokeStyle = brush.strokeStyle;
      context.lineWidth = brush.lineWidth;

      contextRef.current = context;
  },[])

  React.useEffect(() => {
    contextRef.current.strokeStyle = brush.strokeStyle;
    contextRef.current.lineWidth = brush.lineWidth;
  }, [brush])

  const startDrawing = ({nativeEvent}) => {
      const {offsetX, offsetY} = nativeEvent;
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
      setIsDrawing(true);
      nativeEvent.preventDefault();
  };

  const draw = ({nativeEvent}) => {
      if (!isDrawing){
          return
      }
      const {offsetX, offsetY} = nativeEvent;
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
      nativeEvent.preventDefault();
  }

  const stopDrawing = () => {
      contextRef.current.closePath();
      setIsDrawing(false);
  }

  const [cursor, setCursor] = React.useState(pencilCursor);

  function updateTool(e){
    let tool = e.target.id;
    tool = tool.slice(7, tool.length);
    
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

  }

	return (
    <div className = "canvas"  style={{height: '100vh' }}>
      <div className = "canvas--section">
        <Link to = "/">DRAW TOGETHER</Link>
        <div className="vl"/>
        <p>test</p>
        <p>{mode}</p>
      </div>
      <div className = "canvas--section">
        <img src = {bear} className = "small-avatar" alt = "avatar"/>
        <img src = {cat} className = "small-avatar" alt = "avatar"/>
        <div className = "vl"/>
        <button onClick={downloadDrawing}>Download<input type = "image"  src = {downloadIcon} className = "canvas--icon" /></button>
        {tutOpen && <Tutorial />}
        <button
            onClick = {() => {
              setTutOpen(prev => !prev)
            }}
        >Tutorial<input type = "image"  src = {helpIcon} 
        className = "canvas--icon" /></button>
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
        <div id = "cover">

        </div>
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