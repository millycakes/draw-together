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
  const[user, setUser] = React.useState({});
  const[joinedRoom, setJoinedRoom] = React.useState(false);
  const validKeys = [];


  useEffect(() => {
    if (joinedRoom) {
      socket.emit("user_join", user);
    }
  })

  return (
      <Routes>
          <Route path = "/loading"  element ={<Loading socket = {socket} user = {user}/>}/>
          <Route path = "/"  element = {<Home socket = {socket} validKeys = {validKeys} user = {user}/>}/>
          <Route path = "/player-settings"  element = {<PlayerSettings socket = {socket} setUser = {setUser} setJoinedRoom = {setJoinedRoom}/>}/>
          <Route path = "/host-settings"  element = {<HostSettings socket = {socket} setUser = {setUser} setJoinedRoom = {setJoinedRoom} validKeys = {validKeys}/>}/>
      </Routes>
  );
}

export default App;
