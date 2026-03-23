const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let todos = [
  { id: 1, text: "Buy groceries", done: false },
  { id: 2, text: "do laundry", done: true },
];

let users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" }
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/user", (req, res) => {
  res.send(users);
});

app.post("/api/user", (req, res) => {
  const { name } = req.body;
  if (typeof name !== "string" || name.trim() === "") {
    res.status(400).send("Invalid user data");
    return;
  }
  const id = users.length + 1;
  const user = { id, name: name.trim() };
  users.push(user);
  res.send(user);
});

app.get("/api/todos", (req, res) => {
  res.send(todos);
});

app.get("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find((todo) => todo.id == id);
  if (todo) {
    res.send(todo);
  } else {
    res.status(404).send("todo not found");
  }
});

app.post("/api/todos", (req, res) => {
  const { text, done } = req.body;
  if (typeof text !== "string" || text.trim() === "") {
    res.status(400).send("Invalid todo data");
    return;
  }
  const id = todos.length + 1;
  const todo = { id, text: text.trim(), done: Boolean(done) };
  todos.push(todo);
  res.send(todo);
});

app.put("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const { text, done } = req.body;
  const todo = todos.find((todo) => todo.id == id);
  if (todo) {
    if (text !== undefined) {
      if (typeof text !== "string" || text.trim() === "") {
        res.status(400).send("Invalid todo data");
        return;
      }
      todo.text = text.trim();
    }
    if (done !== undefined) {
      if (typeof done !== "boolean") {
        res.status(400).send("Invalid todo data");
        return;
      }
      todo.done = done;
    }
    res.send(todo);
  } else {
    res.status(404).send("Todo not found");
  }
});

app.delete("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    res.status(404).send("Todo not found");
    return;
  }
  todos = todos.filter((todo) => todo.id !== id);
  res.send(`Todo with id ${id} has been deleted`);
});

app.use((req, res) => {
  res.status(404).send("Not found");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});