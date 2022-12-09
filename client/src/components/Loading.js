import { Navigate, useNavigate } from 'react-router-dom';

export default function Loading ({user}) {

    const navigate = useNavigate();

    setTimeout(function(){
        navigate("/canvas");
      }, 2000);


    return(
        <div>
            <img src = "https://i.imgur.com/00ZlPQ0.gif" />
            <p> {user.host ? "Waiting for player..." : "Waiting for host to start the game..."} </p>
        </div>
    )
}

