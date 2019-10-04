// server.js
const next = require("next");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handler = routes.getRequestHandler(app, ({ req, res, route, query }) => {
  app.render(req, res, route.page, query);
});

const express = require("express");
var mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "techletic"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("You are now connected...");
});

const server = express();
server.use(cors());
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
server.get("/data", (req, res) => {
  connection.query("SELECT * from categories", (error, results, fields) => {
    let arr = [];
    results.map(function(key, values) {
      arr.push(results[values].name);
    });
    if (error) throw error;
    return res.send({ name: arr });
  });
});

app.prepare().then(() => {
  server.use(handler).listen(3000, function() {
    console.log("Go to http://localhost:3000/users so you can see the data.");
  });
});
