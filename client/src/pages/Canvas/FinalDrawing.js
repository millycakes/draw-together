import Button from "../../components/Button"
import downloadIcon from "../../assets/icons/download.png"
import { useNavigate } from 'react-router-dom';
import closeIcon from "../../assets/icons/close.png"

export default function FinalDrawing({player, host, canvas, user, setFinalOpen}){

    const navigate = useNavigate();

    //ISSUE HERE -> user data is not cleared when u quit/playagain

    function quit(){
        navigate("/")
    }

    function playAgain(){
        if (user.host) {
            navigate("/mode-selection")
            return;
        }
        navigate("/loading")
    }

   

    function downloadDrawing(canvasRef){
        let downloadLink = document.createElement('a');
        downloadLink.setAttribute('download', 'CanvasAsImage.png');
        const canvasImage = canvasRef.toDataURL('image/png');
        let url = canvasImage.replace(/^data:image\/png/,'data:application/octet-stream');
        downloadLink.setAttribute('href', url);
        downloadLink.click();
      }
    

    return(
        <div className="modal">
            <div className="final-drawing">
                <button className = "tutorial--close" onClick = {() => setFinalOpen(false)}><img src = {closeIcon}/></button>
                <div className= "final-drawing--creators">
                    <p>Drawing by:</p>
                    <p>{`${host.name} & ${player.name}`}</p>
                </div>
                <div className = "final-drawing--avatars">
                    <img className = "avatar-small" src = {host.avatar}/>
                    <img className = "avatar-small" src = {player.avatar}/>
                    <button onClick={() => {downloadDrawing(canvas)}}><img src = {downloadIcon}/></button>
                </div>
                <img className = "final-drawing--image" src = {canvas.toDataURL()} />
                <div className="final-drawing--buttons">
                    <Button text = "Play Again" variant="large" onClick={playAgain}/>
                    <Button text = "Quit" variant = "large" onClick={quit}/>
                </div>
            </div>
        </div>
    )
}