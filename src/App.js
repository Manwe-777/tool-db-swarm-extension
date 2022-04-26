import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [peers, setPeers] = useState([]);
  const [peerId, setPeerId] = useState("");

  useEffect(() => {
    window.broadcastChannel.onmessage = (msg) => {
      if (msg.data.type === "SET_PEERS") {
        setPeers(msg.data.peers);
      }
      if (msg.data.type === "SET_PEER_ID") {
        setPeerId(msg.data.id);
      }
    };
    setInterval(() => {
      window.broadcastChannel.postMessage({
        type: "GET_PEERS",
      });
    }, 500);

    setTimeout(() => {
      window.broadcastChannel.postMessage({
        type: "GET_PEER_ID",
      });
    }, 500);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tool-db always-on "server" peer browser extension example</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p >Peer ID: {peerId}</p>
        <p>{peers.length} peers connected.</p>
        {peers.map((key) => {
          return (
            <div
              style={{
                color: "gray",
              }}
              key={key}
            >
              {key.slice(-12)}
            </div>
          );
        })}
      </header>
    </div>
  );
}

export default App;
