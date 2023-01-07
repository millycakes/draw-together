import "./game.css"
import "./settings.css"

export default function FinalDrawing(player,host){
    return(
        <div>
            <p>DRAW TOGETHER</p>
            <p>drawing by</p>
            <p>{host.name}, {player.name}</p>
            <img className = "avatar---avatar" src = {host.avatar}/>
            <img className = "avatar---avatar" src = {player.avatar}/>
            <button/>
            <button />
        </div>
    )
}