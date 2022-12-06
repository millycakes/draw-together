import {Link} from "react-router-dom"

export default function CreateRoom () {

    function handleSubmit(event){
        event.preventDefault();
        console.log("Create room");
    }
    
    return(
        <form onSubmit = {handleSubmit}>
            <p>Create your room to begin</p>
            <button className = "large-button"><Link to = "/avatar">Create Room</Link></button>
        </form>
    )
}