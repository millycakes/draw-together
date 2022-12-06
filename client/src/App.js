// import logo from './logo.svg';
import './App.css';
import {Link, Routes, Route} from "react-router-dom"
import Home from './pages/Home';
import PlayerSettings from './pages/PlayerSettings';
import HostSettings from './pages/HostSettings';
import Loading from './pages/Loading';
import Canvas from './pages/Canvas';

function App() {
  return (
      <Routes>
          <Route path = "/"  element = {<Home />}/>
          <Route path = "/player-settings"  element = {<PlayerSettings />}/>
          <Route path = "/host-settings"  element = {<HostSettings />}/>
          <Route path = "/loading"  element = {<Loading />}/>
          <Route path = "/canvas"  element = {<Canvas />}/>
      </Routes>
  );
}

export default App;
