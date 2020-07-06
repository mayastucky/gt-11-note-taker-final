const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(PORT, function () {
  console.log("App listening on http://localhost:" + PORT);
});
