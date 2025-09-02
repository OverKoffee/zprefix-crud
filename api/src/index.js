const express = require("express");
const cors = require("cors");
const app = express();

const port = 5000;
const knex = require("knex")(require("../knexfile.js")["development"]);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json(`This is the root route!`);
});

app.listen(port, () => {
  console.log(`The server is running on port ${port}.`);
});
