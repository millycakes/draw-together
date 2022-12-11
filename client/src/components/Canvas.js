import React from "react";
import Sketch from "react-p5";

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
		p5.createCanvas(500, 500).parent(canvasParentRef);
        p5.background(0);


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
        p5.fill(255);

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
        <Sketch setup={setup} draw={draw} mouseDragged = {mouseDragged} />;
    </div>
  )
};