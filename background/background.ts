import { ToolDb, toolDbWebrtc } from "tool-db";

alert("Hello!");

var db = new ToolDb({
  peers: [],
  server: true,
  networkAdapter: toolDbWebrtc,
  topic: "testnetwork",
});

db.anonSignIn();

const broadcastChannel = new BroadcastChannel("tooldb-ext-channel");

broadcastChannel.onmessage = (msg) => {
  if (msg.data.type === "GET_PEERS") {
    broadcastChannel.postMessage({
      type: "SET_PEERS",
      peers: Object.values((db.network as any).peerMap).length,
    });
  }
};

// async function main() {
// }
// main();
