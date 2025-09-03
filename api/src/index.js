const express = require("express");
const cors = require("cors");
const app = express();

const port = 5000;
const knex = require("knex")(require("../knexfile.js")["development"]);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json(`Howdy! This is the root route!`);
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

// get all items
app.get("/items", async (req, res) => {
  try {
    const items = await knex("items")
      .join("users", "items.user_id", "users.id")
      .select(
        "items.id",
        "items.item_name",
        "items.description",
        "items.quantity",
        "items.user_id",
        "users.first_name",
        "users.last_name"
      );
    res.json(items);
  } catch (err) {
    console.log(`Error on items fetch.`, err);
    res.status(500).json({ err: `Check express get for /items` });
  }
});

// get items for just logged in user
app.get("/users/:id/items", async (req, res) => {
  try {
    const items = await knex("items")
      .where("items.user_id", req.params.id)
      .join("users", "items.user_id", "users.id")
      .select(
        "items.id",
        "items.item_name",
        "items.description",
        "items.quantity",
        "items.user_id",
        "users.first_name",
        "users.last_name"
      );
    res.json(items);
  } catch (err) {
    console.log(`Error on items fetch for logged in user.`, err);
    res.status(500).json({ err: `Check express get for /users/:id/items.` });
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

// update item
app.patch("/items/:id", async (req, res) => {
  const { user_id, item_name, description, quantity } = req.body;

  try {
    const patched = await knex("items")
      .where({ id: req.params.id, user_id })
      .update({ item_name, description, quantity });

    if (patched) {
      res.json(true);
    } else {
      res.json(false);
    }
  } catch (err) {
    res.status(500).json(`Failed on update.`);
  }
});

// create/add new item
app.post("/items", async (req, res) => {
  const { user_id, item_name, description, quantity } = req.body;
  try {
    const [addItem] = await knex("items")
      .insert({ user_id, item_name, description, quantity })
      .returning("*");
    res.json(addItem);
  } catch (err) {
    res.status(500).json(`Failed to create new item.`);
  }
});

app.listen(port, () => {
  console.log(`The server is running on port ${port}.`);
});
