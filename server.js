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

// const express = require("express");
// const next = require("next");
// const dev = process.env.NODE_ENV !== "production";
// const app = next({ dev });
// const handle = app.getRequestHandler();
// app
//   .prepare()
//   .then(() => {
//     const server = express();
//     server.route("/categories/:slug")
//     .get(function (req, res) {
//       const queryParams = { brand: req.params.brand };
//       app.render(req, res, '/categories', queryParams);
//     });
//     // server.get("/categories/:slug", (req, res) => {
//     //   const queryParams = { slug: req.params.slug };
//     //   app.render(req, res, 'categories', queryParams);
//     // });
//     server.get("brands/:brand/:family", (req, res) => {
//       const queryParams = {brand:req.params.brand};
//       app.render(req, res, '/brands', queryParams);
//     });
//     server.get("/:slug/:brand", (req, res) => {
//         const queryParams = { slug: req.params.slug, brand:req.params.brand };
//         app.render(req, res, '/categories', queryParams);
//       });
    
//     server.get("*", (req, res) => {
//       return handle(req, res);
//     });
//     server.listen(3000, err => {
//       if (err) throw err;
//       console.log("> Ready on http://localhost:3000");
//     });
//   })
//   .catch(ex => {
//     console.error(ex.stack);
//     process.exit(1);
// });