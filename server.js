// server.js
const next = require('next')
const routes = require('./routes')
const app = next({dev: process.env.NODE_ENV !== 'production'})
const handler = routes.getRequestHandler(app, ({req, res, route, query}) => {
  app.render(req, res, route.page, query)
})
const express = require('express')
app.prepare().then(() => {
  express().use(handler).listen(3000)
})

// .then(() => {
//   const server = express();
//   server.route("/:slug/:brand")
//   .get(function (req, res) {
//     const queryParams = { slug: req.params.slug, brand: req.params.brand };
//     app.render(req, res, '/', queryParams);
//   });
// })
// .catch(ex => {
//   console.error(ex.stack);
//   process.exit(1);
// });

var mysql = require('mysql')
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'techletic'
});

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})



