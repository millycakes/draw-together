import React from "react";
import Sketch from "react-p5";
import {Link} from "react-router-dom"
import pencil from "../assets/tools/pencil.png"
import eraser from "../assets/tools/eraser.png"
import eyedropper from "../assets/tools/eyedropper.png"
import clear from "../assets/tools/clear.png"
import downloadIcon from "../assets/download.png"

import pencilCursor from "../assets/cursors/pencil.png"
import eraserCursor from "../assets/cursors/eraser.png"
import eyedropperCursor from "../assets/cursors/eyedropper.png"

export default function Canvas (props) {

  alert(props.mode);
  
  const [data, setData] = React.useState(
    {
      x: 0, 
      y: 0,
      color: "rgb(79, 79, 79)",
      strokeWeight: 20,
      tool: "pencil"
    }
  )

  const [cursor, setCursor] = React.useState(pencilCursor);

  function updateTool(e){
    let tool = e.target.id;
    tool = tool.slice(7, tool.length);
    
    data.tool = tool;

    switch (data.tool){
      case "pencil":
        setCursor(pencilCursor);
        break;
      case "eraser":
        setCursor(eraserCursor);
        break;
      case "eyedropper":
        setCursor(eyedropperCursor);
        break;
      default:
        break;
    }
  }

  function updateEyedropperCursor(){
    setCursor(pencilCursor);
  }

  function updateStroke(e){
    let strokeWeight = window.getComputedStyle(e.target, null).getPropertyValue("width");
    strokeWeight = strokeWeight.slice(0, strokeWeight.length - 2);
    data.strokeWeight = strokeWeight
  }

  function updateColor(e){
    let color = window.getComputedStyle(e.target, null).getPropertyValue("background-color");
    data.color = color;
  }

  let download = false;

  function downloadDrawing(){
    download = true;
  }

	const setup = (p5, canvasParentRef) => {
		p5.createCanvas(500, 500).parent(canvasParentRef);
      p5.background(255);
	};

	const draw = (p5) => {

    if (download){
      p5.saveCanvas("drawing", "png");
      download = false;
    }

    //handle data from socket
    props.socket.on('mouse',
    function(data) {
      console.log(data)
      p5.fill(data.color);
      p5.noStroke();
      p5.ellipse(data.x, data.y, data.strokeWeight, data.strokeWeight);

      if (data.tool === "clear"){
        p5.fill(255,255,255)
        p5.rect(0, 0, 500, 500);
      }
    }

  );};
  
  const mousePressed = (p5) => {
    if (data.tool === "eyedropper"){
      data.color = p5.get(p5.mouseX, p5.mouseY);
      data.tool = "pencil"
      updateEyedropperCursor()
    }
  }
  
  const mouseDragged = (p5) => {
    p5.noStroke();
    p5.fill(data.color);

    let handleClear = false;

    data.x = p5.mouseX;
    data.y = p5.mouseY;
    
    switch (data.tool){
      case "pencil":
        p5.ellipse(data.x, data.y, data.strokeWeight, data.strokeWeight);
        break;
      case "eraser":
        p5.fill(255,255,255)
        data.color = ("rgb(255, 255, 255)")
        p5.ellipse(data.x, data.y, data.strokeWeight, data.strokeWeight);
        break;        
      case "clear":
        p5.fill(255,255,255);
        p5.rect(0, 0, 500, 500);
        handleClear = true;
        break;
      default:
        break;
    }

    props.socket.emit('mouse', data)

    if (handleClear){
      data.tool = "pencil";
    }
  }

	return (
    <div className = "canvas"  style={{height: '100vh' }}>
      <div>
        <Link to = "/" className = "home-logo">DRAW TOGETHER</Link>
      </div>
      <input type = "image"  src = {downloadIcon} onClick = {downloadDrawing} className = "canvas--download small-shadow" />
      <div style = {{cursor: `url(${cursor}), auto`}}>
        <Sketch className = "canvas--board small-shadow" 
        setup={setup} draw={draw} mousePressed = {mousePressed} mouseDragged = {mouseDragged} />
      </div>
      <div className = "toolbox small-shadow">
        <ul className = "tools" onClick = {updateTool}>
          <li><img id = "tools--pencil" alt = "pencil icon" src = {pencil}/></li>
          <li><img id = "tools--eraser" alt = "eraser icon" src = {eraser}/></li>
          <li><img id = "tools--eyedropper" alt = "eyedropper icon" src = {eyedropper}/></li>
          <li><img id = "tools--clear" alt = "clear icon" src = {clear}/></li>
        </ul>
        <hr className = "vertical"/>
        <ul className = "stroke" onClick = {updateStroke}>
          <li id = "stroke--small"></li>
          <li id = "stroke--medium"></li>
          <li id = "stroke--large"></li>
        </ul>
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
    </div>
  )
};