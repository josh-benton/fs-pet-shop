"use strict";

const fs = require("fs");
const path = require("path");
let petsPath = path.join(__dirname, "pets.json");
let pets;

const http = require("http");
const port = process.env.PORT || 8000;

let server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/pets") {
    fs.readFile(petsPath, "utf-8", (err, petsJSON) => {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        return res.end("Internal Server Error");
      }

      res.setHeader("Content-Type", "application/json");
      res.end(petsJSON);
    });
  } else if (req.method === "GET" && req.url === "/pets/0") {
    fs.readFile(petsPath, "utf-8", (err, petsJSON) => {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        return res.end("Internal Server Error");
      }

      pets = JSON.parse(petsJSON);
      petsJSON = JSON.stringify(pets[0]);

      res.setHeader("Content-Type", "application/json");
      res.end(petsJSON);
    });
  } else if (req.method === "GET" && req.url === "/pets/1") {
    fs.readFile(petsPath, "utf-8", (err, petsJSON) => {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        return res.end("Internal Server Error");
      }

      pets = JSON.parse(petsJSON);
      petsJSON = JSON.stringify(pets[1]);

      res.setHeader("Content-Type", "application/json");
      res.end(petsJSON);
    });
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    return res.end("Not Found");
  }
});

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
