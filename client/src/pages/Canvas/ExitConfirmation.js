import { useNavigate } from 'react-router-dom';
import closeIcon from "../../assets/icons/close.png"
import Button from '../../components/Button';

export default function ExitConfirmation({setOpenModal}){
    const navigate = useNavigate();
    function navigateHome(){
        navigate("/")
    }

    return(
        <div className = "modal">
            <div className = "exit">
                <button className = "tutorial--close" onClick = {() => setOpenModal(false)}><img src = {closeIcon}/></button>
                <p>Are you sure you want to quit?</p>
                <p>You will not be able to recover this drawing.</p>
                <Button onClick = {() => setOpenModal(false)} text = "Continue Game"/>
                <Button onClick = {navigateHome} text = "Quit"/>
            </div>
        </div>
    )
}