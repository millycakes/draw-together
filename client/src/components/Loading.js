import React from "react";
export default function Loading ({socket, user}) {
    
    //when both players in room are ready, twoready boolean will be set to true

    let twoready = false;

    React.useEffect(() => {
        socket.on("ready_two", () => {
            twoready = true;
        })
    }, []);


    return(
        <div>
            <img src = "https://i.imgur.com/00ZlPQ0.gif" />
            <p> {user.host ? "Waiting for player..." : "Waiting for host to start the game..."} </p>
        </div>
    )
}

