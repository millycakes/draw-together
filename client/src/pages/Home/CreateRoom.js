import {Link} from "react-router-dom"

export default function CreateRoom () {

    function handleSubmit(event){
        event.preventDefault();
        console.log("Create room");
    }
    
    return(
        <form onSubmit = {handleSubmit}>
            <p>Create your room to begin</p>
            <Link to = "/host-settings">      
                <button className = "large-button">Create Room</button>
            </Link>
        </form>
    )
}