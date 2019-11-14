const config = require("../config.js");
const routes = require("../routes");
const Database = require("../services/database");

module.exports = function(app) {
  const database = new Database(config.dev);

  app.get("/api/getcategory/:slug", (req, res) => {
    const { slug } = req.params;
    database.query(
      "SELECT * FROM categories WHERE slug='" +
        slug +
        "' AND parent_ID IS NULL LIMIT 200",
      (error, result) => {
        if (error) throw error;
        return res.send(result);
      }
    );
  });
  app.get("/api/getbrandsbycategory/:slug", (req, res) => {
    const { slug } = req.params;
    database.query(
      "SELECT a.* \
        FROM product_heirarchy a \
        INNER JOIN categories as c ON c.ID = a.parent_ID \
        WHERE a.type='brand' \
        AND c.slug='" +
        slug +
        "'\
        AND c.parent_ID IS NULL LIMIT 200",
      (error, result) => {
        if (error) throw error;
        return res.send(result);
      }
    );
  });
  app.get("/api/getsubcategoriesbycategory/:slug", (req, res) => {
    const { slug } = req.params;
    database.query(
      "SELECT b.* FROM `categories` as a, categories as b WHERE a.slug='" +
        slug +
        "' AND a.parent_ID is null AND a.ID = b.parent_ID LIMIT 200",
      (error, result) => {
        if (error) throw error;
        return res.send(result);
      }
    );
  });
  app.get("/api/getmodelsbycategory/:slug/", (req, res) => {
    const { slug } = req.params;
    database.query(
      `SELECT p.*, a.slug as brand_slug \
        FROM product_heirarchy a \
        INNER JOIN categories 			as c ON c.ID = a.parent_ID \
        INNER JOIN product_heirarchy 	as ph1 ON ph1.parent_ID = a.ID \
        INNER JOIN product_heirarchy 	as ph2 ON ph2.parent_ID = ph1.ID \
        INNER JOIN products 			as p ON p.parent_ID = ph2.ID \
        WHERE a.type='brand' AND ph1.type='family' AND ph2.type='series' and c.slug = '${slug}' and c.parent_ID IS NULL LIMIT 200`,
      (error, result) => {
        if (error) throw error;
        return res.send(result);
      }
    );
  });
  app.get("/api/getmodelsbycategory/:slug/page/:page?", (req, res) => {
    const { slug, page } = req.params;
    let pageNum = parseInt(page) - 1;
    database.query(
      `SELECT p.*, a.slug as brand_slug  \
        FROM product_heirarchy a \
        INNER JOIN categories 			as c ON c.ID = a.parent_ID \
        INNER JOIN product_heirarchy 	as ph1 ON ph1.parent_ID = a.ID \
        INNER JOIN product_heirarchy 	as ph2 ON ph2.parent_ID = ph1.ID \
        INNER JOIN products 			as p ON p.parent_ID = ph2.ID \
        WHERE a.type='brand' AND ph1.type='family' AND ph2.type='series' and c.slug = '${slug}' and c.parent_ID IS NULL LIMIT 20 OFFSET ${
        pageNum ? pageNum * 20 : 0
      }`,
      (error, result) => {
        if (error) throw error;
        return res.send(result);
      }
    );
  });
};
