export default function Loading (props) {
    return(
        <div>
            <img src = "https://i.imgur.com/00ZlPQ0.gif" />
            <p> {props.user.host ? "Waiting for player..." : "Waiting for host to start the game..."} </p>
        </div>
    )
}

