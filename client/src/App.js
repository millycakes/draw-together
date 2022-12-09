// import logo from './logo.svg';
import React, { useEffect } from "react";
import {Routes, Route} from "react-router-dom"
import Home from './components/Home';
import PlayerSettings from './components/PlayerSettings';
import HostSettings from './components/HostSettings';
import Loading from './components/Loading';
import io from "socket.io-client";

function App() {
  const socket = io.connect("http://localhost:3000");

  const[user, setUser] = React.useState({
    name: "player",
    host: false,
    key: 0
  });

  const[joined, setJoined] = React.useState(false);
  const [validKeys, setValidKeys] = React.useState([]);
  const [playerKey, setPlayerKey] = React.useState("");

  useEffect(() => {
    if (joined) {
      socket.emit("user_join", user);
    }
  })

  return (
      <Routes>
          <Route path = "/loading" element = {
            <Loading 
              socket = {socket} 
              user = {user}
            />
          }/>
          <Route path = "/" element = {
            <Home 
              socket = {socket} 
              validKeys = {validKeys} 
              playerKey = {playerKey}
              setPlayerKey = {setPlayerKey}
            />
          }/>
          <Route path = "/player-settings"  element = {
            <PlayerSettings 
              socket = {socket} 
              user = {user}
              setUser = {setUser} 
              joined = {joined}
              setJoined = {setJoined}
              playerKey = {playerKey}
            />
          }/>
          <Route path = "/host-settings"  element = {
            <HostSettings 
              socket = {socket} 
              user = {user}
              setUser = {setUser} 
              joined = {joined}
              setJoined = {setJoined} 
              validKeys = {validKeys}
              setValidKeys = {setValidKeys} 
            />}
          />
      </Routes>
  );
}

export default App;
