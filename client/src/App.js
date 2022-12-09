// import logo from './logo.svg';
import React, { useEffect } from "react";
import {Routes, Route} from "react-router-dom"
import Home from './components/Home';
import PlayerSettings from './components/PlayerSettings';
import HostSettings from './components/HostSettings';
import Loading from './components/Loading';
import io from "socket.io-client";
import Canvas from "./components/Canvas";

function App() {
  const socket = io.connect("http://localhost:4000");

  const[user, setUser] = React.useState({
    name: "player",
    host: false,
    key: 0
  });

  const[joined, setJoined] = React.useState(false);
  const [validKeys, setValidKeys] = React.useState([]);
  const [playerKey, setPlayerKey] = React.useState("");
  const[hostKey, setHostKey] = React.useState("");
  const[playerSocket, setPlayerSocket] = React.useState(false);
  const[hostSocket, setHostSocket] = React.useState(false);

  let counter = 0;
  useEffect(() => {
    if (joined) {
      socket.emit("user_join", user);
    }
  }, [joined])

  useEffect(() => {
    if (playerSocket) {
      socket.emit("join_room", playerKey);
    }
  }, [playerSocket])

  useEffect(() => {
    if (hostSocket) {
      socket.emit("join_room", hostKey);
    }
  }, [hostSocket])

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
              validKeys = {validKeys} 
              playerKey = {playerKey}
              setPlayerKey = {setPlayerKey}
              setPlayerSocket = {setPlayerSocket}
              setHostSocket = {setHostSocket}
            />
          }/>
          <Route path = "/player-settings"  element = {
            <PlayerSettings 
              user = {user}
              setUser = {setUser} 
              joined = {joined}
              setJoined = {setJoined}
              playerKey = {playerKey}
            />
          }/>
          <Route path = "/host-settings"  element = {
            <HostSettings 
              user = {user}
              setUser = {setUser} 
              joined = {joined}
              setJoined = {setJoined} 
              validKeys = {validKeys}
              setValidKeys = {setValidKeys} 
              hostKey = {hostKey}
              setHostKey = {setHostKey}
              setHostSocket = {setHostSocket}
            />}
          />
          <Route path = "/canvas"  element = {
            <Canvas
            />}
          />
      </Routes>
  );
}

export default App;
