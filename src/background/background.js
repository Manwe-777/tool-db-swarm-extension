import { ToolDb } from "tool-db";

const Libp2p = require("libp2p");
const WebSockets = require("libp2p-websockets");
const { NOISE } = require("libp2p-noise");
const MPLEX = require("libp2p-mplex");
const Bootstrap = require("libp2p-bootstrap");

alert("Hello!");
const db = new ToolDb({ peers: ["https://api.mtgatool.com:443"] });
db.onConnect = () => {
  db.getData("test").then(console.log);
};

// Known peers addresses
const bootstrapMultiaddrs = [
  "/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb",
  "/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN",
];

const options = {
  modules: {
    transport: [WebSockets],
    connEncryption: [NOISE],
    streamMuxer: [MPLEX],
    peerDiscovery: [Bootstrap],
  },
  config: {
    peerDiscovery: {
      autoDial: true, // Auto connect to discovered peers (limited by ConnectionManager minConnections)
      // The `tag` property will be searched when creating the instance of your Peer Discovery service.
      // The associated object, will be passed to the service when it is instantiated.
      [Bootstrap.tag]: {
        enabled: true,
        list: bootstrapMultiaddrs, // provide array of multiaddrs
      },
    },
  },
};

async function main() {
  const node = await Libp2p.create(options);
  window.libp2p = node;
  console.log(node.peerId.toB58String());

  node.on("peer:discovery", (peer) => {
    console.log("Discovered %s", peer.id.toB58String()); // Log discovered peer
  });

  node.connectionManager.on("peer:connect", (connection) => {
    console.log("Connected to %s", connection.remotePeer.toB58String()); // Log connected peer
  });

  await node.start();
}

main();
