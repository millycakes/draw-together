// import logo from './logo.svg';
import {Routes, Route} from "react-router-dom"

import Home from './components/Home';
import PlayerSettings from './components/PlayerSettings';
import HostSettings from './components/HostSettings';
import Loading from './components/Loading';

function App() {
  return (
      <Routes>
          <Route path = "/"  element = {<Home />}/>
          <Route path = "/player-settings"  element = {<PlayerSettings />}/>
          <Route path = "/host-settings"  element = {<HostSettings />}/>
          <Route path = "/loading"  element = {<Loading />}/>
      </Routes>
  );
}

export default App;
