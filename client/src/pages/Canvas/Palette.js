import pencil from "../../assets/tools/pencil.png"
import eraser from "../../assets/tools/eraser.png"
import eyedropper from "../../assets/tools/eyedropper.png"
import clear from "../../assets/tools/clear.png"
import "./palette.css"

export default function Palette({brush, setBrush, clearCanvas}){
    
  function updateTool(e){
    let tool = e.target.id;
    tool = tool.slice(7, tool.length);

    if (tool === "clear"){
      clearCanvas();
      return;
    }

    setBrush(prev => ({
      ...prev,
      tool: tool
    }))

    if (brush.tool === "pencil" && tool === "eraser"){
      setBrush(prev => ({
        ...prev,
        prevStrokeStyle: brush.strokeStyle,
        strokeStyle: "rgb(255, 255, 255)"
      }))
    }

    if (brush.tool === "eraser" && tool === "pencil"){
      setBrush(prev => ({
        ...prev,
        strokeStyle: brush.prevStrokeStyle
      }))
    }

    if (tool === "eraser"){
      setBrush(prev => ({
        ...prev,
        strokeStyle: "rgb(255, 255, 255)"
      }))
    }
  }

  function updateColor(e){
    let color = window.getComputedStyle(e.target, null).getPropertyValue("background-color");
    setBrush(prev => ({
      ...prev,
      strokeStyle: color
    }))
  }

  function updateStroke(e){
    let slider = e.target;
    let stroke = e.target.value;

    let valPercent = (stroke / slider.max)*100;
    slider.style.background = `linear-gradient(to right, var(--clr-grey-dark) ${valPercent}%, #d5d5d5 ${valPercent}%)`;
    
    
    setBrush(prev => ({
      ...prev,
      lineWidth: stroke
    }))
  }
    
    return(
        <div className = "palette">
            <ul className = "palette--tools" onClick = {updateTool}>
                <li><img id = "tools--pencil" alt = "pencil icon" src = {pencil}/></li>
                <li><img id = "tools--eraser" alt = "eraser icon" src = {eraser}/></li>
                <li><img id = "tools--eyedropper" alt = "eyedropper icon" src = {eyedropper}/></li>
                <li><img id = "tools--clear" alt = "clear icon" src = {clear}/></li>
            </ul>
            <div className = "palette--vl"/>
            <div className = "palette--stroke" onClick = {updateStroke}>
                <label className = "body-x-small" htmlFor="stroke">Thickness</label>
                <input 
                  type="range" 
                  id="stroke" 
                  name="stroke" 
                  min="1" 
                  max="100"
                  onChange={updateStroke}
                  defaultValue = "5"
                />
            </div>
            <div className = "palette--vl"/>
            <ul className = "palette--colors" onClick = {updateColor}>
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