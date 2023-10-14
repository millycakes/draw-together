// import logo from "./logo.svg";
import React, { useEffect } from "react";
import {Routes, Route} from "react-router-dom"
import io from "socket.io-client";
import bear from "./assets/avatar/bear.png"

import Home from "./pages/Home/Home";
import Loading from "./pages/Loading/Loading";
import GameSelection from "./pages/Settings/GameSelection";
import HostSettings from "./pages/Settings/HostSettings";
import PlayerSettings from "./pages/Settings/PlayerSettings";
import Canvas from "./pages/Canvas/Canvas";
import "./style.css"

function App() {

  const socket = io.connect("http://localhost:4000");

  const[user, setUser] = React.useState({
    name: "player",
    host: false,
    key: 0,
    avatar: bear
  });

  const[host, setHost] = React.useState({
    name: "player",
    host: true,
    key: 0,
    avatar: bear
  });

  const[player, setPlayer] = React.useState({
    name: "player",
    host: false,
    key: 0,
    avatar: bear
  });

  const [joined, setJoined] = React.useState(false);
  const [playerKey, setPlayerKey] = React.useState("");
  const [hostKey, setHostKey] = React.useState("");
  const [playerSocket, setPlayerSocket] = React.useState(false);
  const [hostSocket, setHostSocket] = React.useState(false);
  const [twoready, setTwoReady] = React.useState(false);
  const [allKeys, setAllKeys] = React.useState([]);
  const [retrieveKeys, setRetrieveKeys] = React.useState(false);
  const [selection, setSelection] = React.useState(false);
  const [mode, setMode] = React.useState("");
  const [hostAvatar, setHostAvatar] = React.useState(bear);
  const [retrieve, setRetrieve] = React.useState(false);
  const [readySwap, setReadySwap] = React.useState(false);
  const [readyStart, setReadyStart] = React.useState(false);

  socket.on("ready_start", ()=> {
    setReadyStart(true);
  }) 

  socket.on("ready_swap", ()=> {
    setReadySwap(true);
  })


  socket.on("player_data", (data)=> {
    setPlayer(data);
  })

  socket.on("host_data", (data)=> {
    setHost(data);
  })

  socket.on("player_selection", () => {
    setSelection(true);
  });

  socket.on("ready_two", () => {
    setTwoReady(true);
  });

  socket.on("player_mode", (data) => {
    setMode(data);
  });

  socket.on("newKey", (data) => {
    setAllKeys(data);
  })

  socket.on("retrieved", (data) => {
    setHostAvatar(data);
    setRetrieve(false);
  })

  useEffect(() => {
    if (retrieve) {
      const data = [hostKey,hostAvatar]
      socket.emit("retrieve", data);
    }
  }, [retrieve]);

  useEffect(() => {
    if (retrieveKeys) {
      socket.emit("newKey", hostKey);
      setRetrieveKeys(false);
    }
  }, [retrieveKeys]);

  useEffect(() => {
    if (selection&&user.host) {
      const data = [mode, user.key]
      socket.emit("selection", data);
    }
  }, [selection]);

  useEffect(() => {
    if (joined) {
      socket.emit("user_join", user);
      setJoined(false);
    }
  }, [joined]);

  useEffect(() => {
    if (playerSocket) {
      socket.emit("join_room", playerKey);
      setPlayerSocket(false);
    }
  }, [playerSocket]);

  useEffect(() => {
    if (hostSocket) {
      socket.emit("join_room", hostKey);
      setHostSocket(false);
    }
  }, [hostSocket]);

  return (
      <Routes>
          <Route path = "/mode-selection" element = {
            <GameSelection
              setSelection = {setSelection}
              setMode = {setMode}
              selection = {selection}
              twoready = {twoready}
              setTwoReady = {setTwoReady}
            />
          }/>
          <Route path = "/loading" element = {
            <Loading 
              twoready = {twoready}
              user = {user}
              selection = {selection}
              setSelection = {setSelection}
              setTwoReady = {setTwoReady}
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
              hostAvatar = {hostAvatar}
              setRetrieve = {setRetrieve}
              setHostAvatar = {setHostAvatar}
              host = {host}
            />
          }/>
          <Route path = "/host-settings"  element = {
            <HostSettings 
              user = {user}
              setUser = {setUser} 
              setJoined = {setJoined} 
              hostKey = {hostKey}
              setHostKey = {setHostKey}
              setHostSocket = {setHostSocket}
              setRetrieve = {setRetrieve}
              setHostAvatar = {setHostAvatar}
            />}
          />
          <Route path = "/canvas"  element = {
            <Canvas
              user = {user}
              socket = {socket}
              mode = {mode}
              player = {player}
              setPlayer = {setPlayer}
              host = {host}
              setHost = {setHost}
              readySwap = {readySwap}
              setReadySwap = {setReadySwap}
              readyStart = {readyStart}
              setReadyStart = {setReadyStart}
            />}
          />
      </Routes>
  );
}

export default App;
