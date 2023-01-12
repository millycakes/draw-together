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
    if (color === "rgba(0, 0, 0, 0)"){
      return;
    }

    setBrush(prev => ({
      ...prev,
      strokeStyle: color
    }))

    console.log(brush)
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
                <li className = {brush.tool == "pencil" ? "tools--selected" : ""}>
                  <img id = "tools--pencil" alt = "pencil icon" src = {pencil}/>
                </li>
                <li className = {brush.tool == "eraser" ? "tools--selected" : ""}>
                  <img id = "tools--eraser" alt = "eraser icon" src = {eraser}/>
                </li>
                <li className = {brush.tool == "eyedropper" ? "tools--selected" : ""}>
                  <img id = "tools--eyedropper" alt = "eyedropper icon" src = {eyedropper}/>
                </li>
                <li>
                  <img id = "tools--clear" alt = "clear icon" src = {clear}/>
                </li>
            </ul>
            <div className = "palette--vl"/>
            <div className = "palette--stroke" onClick = {updateStroke}>
                <label className = "body-small" htmlFor="stroke">Thickness</label>
                <input 
                  type="range" 
                  id="stroke" 
                  name="stroke" 
                  min="1" 
                  max="50"
                  onChange={updateStroke}
                  defaultValue = "5"
                />
            </div>
            <div className = "palette--vl"/>
            <ul className = "palette--colors" onClick = {updateColor}>
                <li 
                  id = "colors--pink"
                  className = {brush.strokeStyle == "rgb(250, 148, 194)" ? "colors--selected" : ""}>
                </li>
                <li
                  id = "colors--red"
                  className = {brush.strokeStyle == "rgb(246, 108, 108)" ? "colors--selected" : ""}>
                </li>
                <li 
                  id = "colors--orange"
                  className = {brush.strokeStyle == "rgb(245, 148, 63)" ? "colors--selected" : ""}>
                </li>
                <li 
                  id = "colors--yellow"
                  className = {brush.strokeStyle == "rgb(249, 217, 72)" ? "colors--selected" : ""}>
                </li>
                <li 
                  id = "colors--green"
                  className = {brush.strokeStyle == "rgb(116, 194, 131)" ? "colors--selected" : ""}>
                </li>
                <li 
                  id = "colors--blue"
                  className = {brush.strokeStyle == "rgb(109, 166, 232)" ? "colors--selected" : ""}>
                </li>
                <li 
                  id = "colors--purple"
                  className = {brush.strokeStyle == "rgb(105, 108, 212)" ? "colors--selected" : ""}>
                </li>
                <li 
                  id = "colors--black"
                  className = {brush.strokeStyle == "rgb(79, 79, 79)" ? "colors--selected" : ""}>
                </li>
                <li 
                  id = "colors--white"
                  className = {brush.strokeStyle == "rgb(255, 255, 255)" ? "colors--selected" : ""}>
                </li>
            </ul>
        </div>
    )
}