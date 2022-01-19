#!/bin/bash
const fs = require("fs");

fs.rename(
  __dirname + "/out/background.js",
  __dirname + "/background-ts.js",
  () => {
    console.log("Done");
  }
);
