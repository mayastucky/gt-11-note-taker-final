const express = require("express");
const path = require("path");
//we need to reload this method 
let database = require("./db/db.json");
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//sends the notes.html page when you go to that path
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function (req, res) {
  //we need to read this file so that the database method is run properly
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    database = JSON.parse(data);
    res.json(database);
  });
});

//CREATE NEW NOTE
//final star wars activity (15)and the repo https://github.com/DreissenZulu/Express-Note-Taker was helpful for understanding the progress of logic for post requests!
app.post("/api/notes", function (req, res) {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    database = JSON.parse(data);
    var newNote = req.body;
    database.push(newNote);
    //https://stackoverflow.com/questions/33763768/loop-through-array-of-values-with-arrow-function
    database.forEach((obj, i) => (obj.id = ++i));
    console.log(database);

    fs.writeFile("./db/db.json", JSON.stringify(database), "utf8", (err) => {
      if (err) throw err;
      res.json(database);
    });
  });
});

//DELETE!!
//this deletes it from the DB but does not render it on the page
app.delete("/api/notes/:id", function (req, res) {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    const arrayOfNotes = JSON.parse(data);
    const notDeleted = arrayOfNotes.filter(function (note) {
      return note.id != req.params.id;
    });

    //does not work quite right
    fs.writeFile("./db/db.json", JSON.stringify(notDeleted), "utf8", (err) => {
      if (err) throw err;
      //i think error is here?
      res.json(notDeleted);
    });
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
