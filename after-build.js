#!/bin/bash
const fs = require("fs");

fs.rename(__dirname + "/build/index.html", __dirname + '/build/popup.html', () => {
    console.log("Done")
}); 

