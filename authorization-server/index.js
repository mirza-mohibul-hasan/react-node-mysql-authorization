const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

// database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "react_node_authDB",
});
db.connect(function (err) {
  if (err) throw err;
  console.log("Database is connected successfully !");
});
// default
app.get("/", (req, res) => {
  res.send("Server is running");
});
app.listen(port, () => {
  console.log("Server is running");
});

// Working Zones
app.post("/register", (req, res) => {
  const username = req.body?.username;
  const password = req.body?.password;
  db.query(
    "INSERT INTO users (`username`, `password`) VALUES(?, ?)",
    [username, password],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("An error occurred while registering the user.");
      } else {
        res.status(200).send(result);
      }
    }
  );
});

app.post("/login", (req, res) => {
  const username = req.body?.username;
  const password = req.body?.password;
  db.query(
    "SELECT * FROM users where username=? AND password=?",
    [username, password],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      }
      if (result.length > 0) {
        res.status(200).send(result);
      } else {
        res.status(500).send("Wrong credentials");
      }
    }
  );
});
