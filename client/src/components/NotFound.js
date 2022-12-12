import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {

    const [image, setImage] = React.useState(null);

    React.useEffect(() => {
        fetch("https://dog.ceo/api/breeds/image/random")
        .then(response => response.json())
        .then(response => {
            setImage(response.message);
        })
        .catch(error => console.log(error));
    }, [])

    return(
        <div className = "not-found" style = {{height: "100vh"}}>
            <h1>404 PAGE NOT FOUND :(</h1>
            <img src = {image}/>
            <Link to = "/" className = "home-link">GO BACK HOME!</Link>
        </div>
    )
}