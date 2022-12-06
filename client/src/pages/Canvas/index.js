import React from "react";
import Sketch from "react-p5";
import "./index.css"

	let x = 50;
	let y = 50;
export default (props) => {
	const setup = (p5, canvasParentRef) => {
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)
		p5.createCanvas(window.innerWidth/2.2, window.innerWidth/2.2).parent(canvasParentRef);
	};

	const draw = (p5) => {
		p5.background(255);
		
	};

	return (
        <div className= "canvas">
            <Sketch setup={setup} draw={draw} style={{height: '100vh'}}/>
        </div>
    );
};