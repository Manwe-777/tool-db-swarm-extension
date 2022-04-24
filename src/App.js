import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [peers, setPeers] = useState(0);

  useEffect(() => {
    window.broadcastChannel.onmessage = (msg) => {
      if (msg.data.type === "SET_PEERS") {
        setPeers(msg.data.peers);
      }
    };
    setInterval(() => {
      window.broadcastChannel.postMessage({
        type: "GET_PEERS",
      });
    }, 500);
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{peers} peers connected.</p>
      </header>
    </div>
  );
}

export default App;
