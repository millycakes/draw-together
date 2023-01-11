import Button from "../../components/Button"
import downloadIcon from "../../assets/icons/download.png"
import { useNavigate } from "react-router-dom";
import closeIcon from "../../assets/icons/close.png"
import Logo from "../../components/Logo";

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
        let downloadLink = document.createElement("a");
        downloadLink.setAttribute("download", "CanvasAsImage.png");
        const canvasImage = canvasRef.toDataURL("image/png");
        let url = canvasImage.replace(/^data:image\/png/,"data:application/octet-stream");
        downloadLink.setAttribute("href", url);
        downloadLink.click();
    }
    
    return(
        <div className="modal">
            <div className="final-drawing">
                <Logo variant="final"/>
                <button className = "tutorial--close" onClick = {() => setFinalOpen(false)}>
                    <img alt = "close icon" src = {closeIcon}/>
                </button>
                <div className="final-drawing--wrapper">
                    <div className= "final-drawing--creators">
                        <p className="body-small">Drawing by:</p>
                        <p className="body-large">{`${host.name} & ${player.name}`}</p>
                    </div>
                    <div className = "final-drawing--avatars">
                        <img alt = "host avatar" className = "avatar-small" src = {host.avatar}/>
                        <img alt = "player avatar" className = "avatar-small" src = {player.avatar}/>
                        <button className = "final-drawing--download" onClick={() => {downloadDrawing(canvas)}}>
                            <img alt = "download icon" src = {downloadIcon}/>
                        </button>
                    </div>
                </div>
                <img alt = "final drawing" className = "final-drawing--image" src = {canvas.toDataURL()} />
                <div className="final-drawing--buttons">
                    <Button text = "Play Again" variant="large" onClick={playAgain}/>
                    <Button text = "Quit" variant = "large" onClick={quit}/>
                </div>
            </div>
        </div>
    )
}