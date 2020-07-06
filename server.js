const express = require("express");
const path = require("path");
const database = require("./db/db.json");
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//sends the notes.html page when you go to that path
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function (req, res) {
  return res.json(database);
});

//CREATE NEW NOTE
//final star wars activity (15)and the repo https://github.com/DreissenZulu/Express-Note-Taker was helpful for understanding the progress of logic for post requests!
app.post("/api/notes", function (req, res) {
  //read file

  var newNote = req.body;
  //   newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase();
  //   console.log(newNote);
  database.push(newNote);
  console.log(database);
  res.json(database);
  fs.writeFileSync("./db/db.json", JSON.stringify(database), (err) => {
    if (err) throw err;
  });
});

//PLEASE PUT THIS LAST
//sends you to the homepage in any other instance
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//listen to the app
app.listen(PORT, function () {
  console.log("App listening on http://localhost:" + PORT);
});
