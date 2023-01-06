import { useNavigate } from 'react-router-dom';

export default function ExitConfirmation({setOpenModal}){
    const navigate = useNavigate();
function navigateHome(){
    navigate("/")
  }
    return(
        <div>
            <p>Are you sure you want to quit?</p>
            <p>You will not be able to recover this drawing.</p>
            <button onClick={() => {
                setOpenModal(false)
            }}>Continue Game</button>
            <button onClick={navigateHome}>Quit</button>
        </div>
    )
}