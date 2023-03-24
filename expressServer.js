const express = require("express");
const fs = require("fs");
const path = require("path");
// const petRegExp = /^\/pets\/(\d+)$/;
const petRegExp = /^\/pets\/(-?\d+)$/;


const app = express();
const port = process.env.PORT || 8000;
const petsPath = path.join(__dirname, "pets.json");

app.get("/pets", (req, res, next) => {
  res.sendFile(petsPath, (err) => {
    if (err) {
      next(err);
    }
  });
});

app.get(petRegExp, (req, res, next) => {
  const index = parseInt(petRegExp.exec(req.url)[1]);
  fs.readFile(petsPath, "utf-8", (err, petsJSON) => {
    if (err) {
      next(err);
    } else {
      const pets = JSON.parse(petsJSON);
      console.log('index:', index);
      console.log('pets length:', pets.length);
      if (index < 0 || index >= pets.length) {
        console.log('sending 404 response...')
        res.status(404).send("Not Found");
      } else {
        res.json(pets[index]);
      }
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
