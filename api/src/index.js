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

app.get("/users", async (req, res) => {
  try {
    const users = await knex("users").select("*");
    res.json(users);
  } catch (err) {
    console.log(`Error on user fetch.`, err);
    res.status(500).json({ err: `Check express get for /users` });
  }
});

app.get("/items", async (req, res) => {
  try {
    const items = await knex("items").select("*");
    res.json(items);
  } catch (err) {
    console.log(`Error on user fetch.`, err);
    res.status(500).json({ err: `Check express get for /users` });
  }
});

// validate existing login creds
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userpass = await knex("users")
      .where("username", username)
      .andWhere("password", password)
      .first();

    if (userpass) {
      res.json(userpass.id);
    } else {
      res.json(false);
    }
  } catch (err) {
    res.status(500).json(`Failed login.`);
  }
});

// create new user account
app.post("/users", async (req, res) => {
  const { first_name, last_name, username, password } = req.body;
  try {
    await knex("users").insert({ first_name, last_name, username, password });
    res.json(true);
  } catch (err) {
    res.status(500).json(`Failed creating account.`);
  }
});

// delete item from items f/ currentUserID
app.delete("/items/:id", async (req, res) => {
  const { user_id } = req.body;
  try {
    const deleted = await knex("items")
      .where({ id: req.params.id, user_id })
      .del();

    deleted ? res.json(true) : res.json(false);
  } catch (err) {
    res.status(500).json(`Failed to delete item.`);
  }
});

app.listen(port, () => {
  console.log(`The server is running on port ${port}.`);
});
