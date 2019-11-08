// server.js
const                        axios = require("axios");
const fs = require("fs");
const next = require("next");
const routes = require("./routes");
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handler = routes.getRequestHandler(app, ({ req, res, route, query }) => {
  app.render(req, res, route.page, query);
});
var atatus = require("atatus-nodejs");
atatus.start({
    licenseKey: "lic_apm_3342aed6a081495a8fdde4469b86a933",
    appName: "Techlitic",
});

const { PAGE_DESTINATION, createSitemapPages, PRODUCT_DESTINATION, createSitemapProducts, SITEMAP_DESTINATION, createSitemap } = require("./sitemap");

const express = require("express");
var mysql = require("mysql");
const connection = mysql.createConnection({
  multipleStatements: true,
  host: "localhost",
  user: "root",
  database: "techlitic",
  // password: ""
  password: "hv51jxn4dlt32wh5",
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("You are now connected...");
});
let x = [];
const server = express();
server.use((req, res, next) => {
  const test = /\?[^]*\//.test(req.url);
  const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  if (
    req.url.substr(-1) !== "/" &&
    req.url.length > 1 &&
    !test &&
    !fullUrl.match(/\/static\//)
  )
    res.redirect(301, req.url + "/");
  else next();
});
server.get("/:slug/page/:page", (req, res) => {
  const { slug, page } = req.params
  return app.render(req, res, "/", {slug, page});
})

server.get("/data", (req, res) => {
  connection.query(
    "SELECT * from categories; SELECT * from product_heirarchy where type='brand'; SELECT * from product_heirarchy where type='family'; SELECT * from product_heirarchy where type='series'; SELECT * from products; SELECT * from product_meta; SELECT * from variant;",
    [1, 2, 3, 4, 5, 6, 7],
    (error, results, fields) => {
      x.push(results);
      if (error) throw error;
      return res.send({
        categories: results[0],
        brands: results[1],
        families: results[2],
        series: results[3],
        models: results[4],
        product_meta: results[5],
        variants: results[6]
      });
    }
  );
});
server.get("/search-result-page.xml", function(req, res) {
  res.header("Content-Type", "application/xml");
  (async function sendXML() {
    let xmlFile = await createSitemapPages();
    // Send it to the browser
    res.send(xmlFile);
    // Create a file on the selected destination
    fs.writeFileSync(PAGE_DESTINATION, xmlFile);
  })();
});
server.get("/products.xml", function(req, res) {
  res.header("Content-Type", "application/xml");
  (async function sendXML() {
    let xmlFile = await createSitemapProducts();
    // Send it to the browser
    res.send(xmlFile);
    // Create a file on the selected destination
    fs.writeFileSync(PRODUCT_DESTINATION, xmlFile);
  })();
});
server.get("/sitemap.xml", function(req, res) {
  res.header("Content-Type", "application/xml");
  (async function sendXML() {
    let xmlFile = await createSitemap();
    // Send it to the browser
    res.send(xmlFile);
    // Create a file on the selected destination
    fs.writeFileSync(SITEMAP_DESTINATION, xmlFile);
  })();
});
server.get("/:slug/:brand?", (req, res) => {
  connection.query(
    "SELECT * from categories; SELECT * from product_heirarchy where type='brand'; SELECT * from product_heirarchy where type='family'; SELECT * from product_heirarchy where type='series'; SELECT * from products; SELECT * from product_meta; SELECT * from variant;",
    [1, 2, 3, 4, 5, 6, 7],
    (error, results, fields) => {
      if (error) throw error;
      const { slug, brand } = req.params;
      let firstURL = [];
      let secondURL = [];
      let brandsSlug = [];
      let categoriesSlug = [];
      let subcategoriesSlug = [];
      results[1].map(values => {
        brandsSlug.push(values.slug);
        firstURL.push(values.slug);
      });
      results[0].map(values => {
        if (!values.parent_ID) {
          categoriesSlug.push(values.slug);
          firstURL.push(values.slug);
        }
      });
      results[0].map(values => {
        if (values.parent_ID) {
          subcategoriesSlug.push(values.slug);
        }
      });
      if (slug && brandsSlug.indexOf(slug) !== -1) {
        for (let d = 0; d < results[1].length; d++) {
          if (results[1][d].slug === slug) {
            for (let s = 0; s < results[2].length; s++) {
              if (results[2][s].parent_ID === results[1][d].ID) {
                secondURL.push(results[2][s].slug);
                for (let x = 0; x < results[3].length; x++) {
                  if (results[3][x].parent_ID === results[2][s].ID)
                    secondURL.push(results[3][x].slug);
                  for (let i = 0; i < results[4].length; i++) {
                    if (results[4][i].parent_ID === results[3][x].ID) {
                      secondURL.push(results[4][i].slug);
                    }
                  }
                }
              }
            }
          }
        }
      }
      if (!brand) {
        if (slug && firstURL.indexOf(slug) === -1) {
          return app.render(req, res, `/notfound`);
        } else {
          return app.render(req, res, "/", { slug, brand });
        }
      }
      if (slug && firstURL.indexOf(slug) === -1) {
        return app.render(req, res, `/notfound`);
      }
      if (slug && brandsSlug.indexOf(slug) !== -1 && brand) {
        // Family Series Model
        if (secondURL.indexOf(brand) === -1) {
          return app.render(req, res, `/notfound`);
        } else {
          return app.render(req, res, "/", { slug, brand });
        }
      }
      if (slug && categoriesSlug.indexOf(slug) !== -1 && brand) {
        // Subcategory
        if (subcategoriesSlug.indexOf(brand) === -1) {
          return app.render(req, res, `/notfound`);
        } else {
          return app.render(req, res, "/", { slug, brand });
        }
      }
    }
  );
});
app.prepare().then(() => {
  server.use(handler).listen(3000, function() {
    console.log("Go to http://techlitic.com/users so you can see the data.");
  });
});
