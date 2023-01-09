import closeIcon from "../../assets/icons/close.png"
import Button from "../../components/Button"

export default function FinalDrawing({player, host, setFinalOpen}){

    return(
        <div className="modal">
            <div className="final">
                <button onClick = {() => setFinalOpen(false)} className = "tutorial--close"><img src = {closeIcon}/></button>
                <p>DRAW TOGETHER</p>
                <p>drawing by</p>
                <p>{`${host.name} & ${player.name}`}</p>
                <img className = "avatar---avatar" src = {host.avatar}/>
                <img className = "avatar---avatar" src = {player.avatar}/>
                <Button text = "Play Again" variant="large"/>
                <Button text = "Quit" variant="large"/>
            </div>
        </div>
    )
}