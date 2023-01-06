// import logo from './logo.svg';
import React, { useEffect } from "react";
import {Routes, Route} from "react-router-dom"
import Home from './components/Home';
import PlayerSettings from './components/PlayerSettings';
import HostSettings from './components/HostSettings';
import Loading from './components/Loading';
import io from "socket.io-client";
import Canvas from "./components/Canvas";
import ModeSelection from './components/GameSelection';

function App() {
  const socket = io.connect("http://localhost:4000");

  const[user, setUser] = React.useState({
    name: "player",
    host: false,
    key: 0
  });

  const[joined, setJoined] = React.useState(false);
  const [playerKey, setPlayerKey] = React.useState("");
  const[hostKey, setHostKey] = React.useState("");
  const[playerSocket, setPlayerSocket] = React.useState(false);
  const[hostSocket, setHostSocket] = React.useState(false);
  const[twoready, setTwoReady] = React.useState(false);
  const[allKeys, setAllKeys] = React.useState([]);
  const[retrieveKeys, setRetrieveKeys] = React.useState(false);
  const[selection, setSelection] = React.useState(false);
  const[mode, setMode] = React.useState("");

  socket.on("ready_two", () => {
    setTwoReady(true);
  });

  socket.on("newKey", (data) => {
    setAllKeys(data);
  })

  useEffect(() => {
    if (retrieveKeys) {
      socket.emit("newKey", hostKey);
    }
  }, [retrieveKeys]);

  useEffect(() => {
    if (selection) {
      const data = [mode, user.key]
      socket.emit("selection", data);
    }
  }, [selection]);

  useEffect(() => {
    if (joined) {
      socket.emit("user_join", user);
    }
  }, [joined]);

  useEffect(() => {
    if (playerSocket) {
      socket.emit("join_room", playerKey);
    }
  }, [playerSocket]);

  useEffect(() => {
    if (hostSocket) {
      socket.emit("join_room", hostKey);
    }
  }, [hostSocket]);

  return (
      <Routes>
          <Route path = "/mode-selection" element = {
            <ModeSelection
              setSelection = {setSelection}
              setMode = {setMode}
              selection = {selection}
            />
          }/>
          <Route path = "/loading" element = {
            <Loading 
              twoready = {twoready}
              user = {user}
              selection = {selection}
            />
          }/>
          <Route path = "/" element = {
            <Home 
              allKeys = {allKeys} 
              playerKey = {playerKey}
              setPlayerKey = {setPlayerKey}
              setPlayerSocket = {setPlayerSocket}
              setRetrieveKeys = {setRetrieveKeys}
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
              hostKey = {hostKey}
              setHostKey = {setHostKey}
              setHostSocket = {setHostSocket}
            />}
          />
          <Route path = "/canvas"  element = {
            <Canvas
              socket = {socket}
              mode = {mode}
            />}
          />
          
      </Routes>
  );
}

export default App;
