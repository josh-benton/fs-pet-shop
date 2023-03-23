"use strict";

const fs = require("fs");
const path = require("path");
let petsPath = path.join(__dirname, "pets.json");
let pets;

const http = require("http");
const port = process.env.PORT || 8000;

const petRegExp = /^\/pets\/(\d+)$/;

let server = http.createServer((req, res) => {
  if (req.method === "GET") {
    if (req.url === "/pets" || req.url === "/pets/") {
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
    } else if (petRegExp.test(req.url)) {
      const index = parseInt(petRegExp.exec(req.url)[1]);
      fs.readFile(petsPath, "utf-8", (err, petsJSON) => {
        if (err) {
          console.error(err.stack);
          res.statusCode = 500;
          res.setHeader("Content-Type", "text/plain");
          return res.end("Internal Server Error");
        }

        pets = JSON.parse(petsJSON);
        if (index >= pets.length) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/plain");
          return res.end("Not Found");
        }

        const petJSON = JSON.stringify(pets[index]);
        res.setHeader("Content-Type", "application/json");
        res.end(petJSON);
      });
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain");
      return res.end("Not Found");
    }
  }

  if (req.method === 'POST' && req.url === '/pets') {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    })

    req.on('end', () => {
        const data = JSON.parse(body);

        fs.readFile(petsPath, 'utf-8', (err, petsJSON) => {
            if (err) {
                console.error(err.stack);
                res.statusCode = 500;
                res.setHeader("Content-Type", "text/plain");
                return res.end("internal Server Error");
            }

            pets = JSON.parse(petsJSON);

            pets.push(data);

            fs.writeFile(petsPath, JSON.stringify(pets), err => {
                if (err) {
                    console.error(err.stack);
                    res.statusCode = 500;
                    res.setHeader("Content-Type", "text/plain");
                    return res.end("Internal Server Error");
                }

                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(data));
            })
        })
    })
  }
});

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
