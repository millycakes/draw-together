import pencil from "../../assets/tools/pencil.png"
import eraser from "../../assets/tools/eraser.png"
import eyedropper from "../../assets/tools/eyedropper.png"
import clear from "../../assets/tools/clear.png"
import "./palette.css"

export default function Palette({brush, setBrush, ctxRef}){
    
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
    
    return(
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
                defaultValue = "5"/>
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
    )
}