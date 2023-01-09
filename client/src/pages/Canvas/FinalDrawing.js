import closeIcon from "../../assets/icons/close.png"
import Button from "../../components/Button"
import downloadIcon from "../../assets/icons/download.png"

export default function FinalDrawing({player, host, setFinalOpen, drawing}){

    return(
        <div className="modal">
            <div className="final-drawing">
                <button onClick = {() => setFinalOpen(false)} className = "tutorial--close"><img src = {closeIcon}/></button>
                <div className= "final-drawing--creators">
                    <p>Drawing by:</p>
                    <p>{`${host.name} & ${player.name}`}</p>
                </div>
                <div className = "final-drawing--avatars">
                    <img className = "avatar-small" src = {host.avatar}/>
                    <img className = "avatar-small" src = {player.avatar}/>
                    <button><img src = {downloadIcon}/></button>
                </div>
                <img className = "final-drawing--image" src = {drawing} />
                <div className="final-drawing--buttons">
                    <Button text = "Play Again" variant="large"/>
                    <Button text = "Quit" variant="large"/>
                </div>
            </div>
        </div>
    )
}