
// server.js
const next = require("next");
const routes = require("./routes");
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
  database: "techlitic"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("You are now connected...");
});

const server = express();
server.get("/data", (req, res) => {
  connection.query(
    "SELECT * from categories; SELECT * from products where type='brand'; SELECT * from products where type='family'; SELECT * from products where type='series'; SELECT * from products where type='model'; SELECT * from product_meta;"
    , [1,2,3,4,5,6], (error, results, fields) => {
    if (error) throw error;
    return res.send({ categories: results[0], brands: results[1], families: results[2], series: results[3], models: results[4], product_meta: results[5]});
  });
});
server.get("/metatags", (req,res) =>{
  app.render(req, res, '/metatags');
})
server.get('/*', function(req, res, next) {
  if (req.headers.host.match(/www/) !== null ) {
    console.log('without www' + req.headers.host)
    res.redirect('http://' + req.headers.host.replace(/www\./, '') + req.url);
  } else {
    console.log('with www' + req.headers.host)
    next();     
  }
})
app.prepare().then(() => {
  server.use(handler).listen(3000, function() {
    console.log("Go to http://localhost:3000/users so you can see the data.");
  });
});

