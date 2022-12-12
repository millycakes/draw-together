import React from "react";
import Sketch from "react-p5";
import {Link} from "react-router-dom"
import pencil from "../assets/tools/pencil.png"
import eraser from "../assets/tools/eraser.png"
import eyedropper from "../assets/tools/eyedropper.png"
import clear from "../assets/tools/clear.png"

let brush = {
    x: 0,
    y: 0,
    color: "black",
    width: 1
};


export default function Canvas (props) {
  

	const setup = (p5, canvasParentRef) => {
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)
		p5.createCanvas(600, 600).parent(canvasParentRef);
      p5.background(255);


	};

	const draw = (p5) => {
		// NOTE: Do not use setState in the draw function or in functions that are executed
		// in the draw function...
		// please use normal variables or class properties for these purposes
	};

    const mouseDragged = (p5) => {
        p5.ellipse(p5.mouseX,p5.mouseY, 20,20);
        console.log("sending " + p5.mouseX, p5.mouseY)

        p5.noStroke();
        p5.fill(0);

        var data = {
            x: p5.mouseX, 
            y: p5.mouseY
        }

        //https://p5js.org/reference/#/p5/get

        props.socket.emit('mouse', data)

        props.socket.on('mouse',
        // When we receive data
        function(data) {
          console.log("Got: " + data.x + " " + data.y);
          // Draw a blue circle
          p5.fill(0,0,255);
          p5.noStroke();
          p5.ellipse(data.x, data.y, 20, 20);
        }
      );
    }

	return (
    <div class = "canvas"  style={{height: '100vh' }}>
      <div>
        <Link to = "/" className = "home-logo">DRAW TOGETHER</Link>
        <p>Drawing by Player 1 and Player 2</p>
      </div>
      <div>
        <img />
        <img />
      </div>
      <i />
      <Sketch setup={setup} draw={draw} mouseDragged = {mouseDragged} />
      <div class = "toolbox">
        <ul class = "tools">
          <li id = "tools--pencil"><img src = {pencil}/></li>
          <li id = "tools--eraser"><img src = {eraser}/></li>
          <li id = "tools--eyedropper"><img src = {eyedropper}/></li>
          <li id = "tools--clear"><img src = {clear}/></li>
        </ul>
        <ul class = "stroke">
          <li id = "stroke--small"></li>
          <li id = "stroke--medium"></li>
          <li id = "stroke--large"></li>
        </ul>
        <ul class = "palette">
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