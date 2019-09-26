const express = require("express");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
app
  .prepare()
  .then(() => {
    const server = express();
    server.get("/categories/:slug", (req, res) => {
      const queryParams = { slug: req.params.slug };
      app.render(req, res, '/categories', queryParams);
    });
    server.get("/categories/:slug/:brand", (req, res) => {
        const queryParams = { slug: req.params.slug, brand:req.params.brand };
        app.render(req, res, '/categories', queryParams);
      });

    server.get("*", (req, res) => {
      return handle(req, res);
    });
    server.listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
});