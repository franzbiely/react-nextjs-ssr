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
  multipleStatements: true,
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
server.get("/data", (req, res) => {
  connection.query(
    "SELECT * from categories; SELECT * from products where type='brand'; SELECT * from products where type='family'; SELECT * from products where type='series'; SELECT * from products where type='model'"
    , [1,2,3,4,5], (error, results, fields) => {
  //  console.log(results)
    if (error) throw error;
    return res.send({ categories: results[0], brands: results[1], families: results[2], series: results[3], models: results[4]});
  });
});

app.prepare().then(() => {
  server.use(handler).listen(3000, function() {
    console.log("Go to http://localhost:3000/users so you can see the data.");
  });
});
