import { ToolDb } from "tool-db";
alert("Hello!");

const db = new ToolDb({ peers: ["https://api.mtgatool.com:443"] });
db.getData("test").then(console.log);
