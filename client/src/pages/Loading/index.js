export default function Loading () {

    const host = true;

    return(
        <div>
            <img src = "https://i.imgur.com/00ZlPQ0.gif" />
            <p> {host ? "Waiting for player..." : "Waiting for host to start the game..."} </p>
        </div>
    )
}

