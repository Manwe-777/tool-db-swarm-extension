import { ToolDb, toolDbWebrtc } from "tool-db";

alert("Hello!");

var db = new ToolDb({
  peers: [],
  server: true,
  networkAdapter: toolDbWebrtc,
  debug: true,
  topic: "testnetwork",
});

db.anonSignIn();

// async function main() {
// }
// main();
