
const config = require('../config.js')
const routes = require('../routes')
const Database = require('../services/database')

module.exports = function(app){

    const database = new Database(config.dev)
    app.get("/api/getbrands", (req, res) => {
        database.query("SELECT * FROM product_heirarchy WHERE type='brand' LIMIT 200",
        (error, result) => {
            if(error) throw error;
           return res.send(result) 
        })
    })
    app.get("/api/getproductsbybrand/:slug", (req, res) => { 
        const { slug } = req.params;
        database.query("select aa.* from products as aa, product_heirarchy as a, product_heirarchy as b, product_heirarchy as c INNER JOIN product_heirarchy WHERE a.slug ='"+slug+"' AND a.ID = b.parent_ID AND b.ID = c.parent_ID AND c.ID = aa.parent_ID AND a.type = 'brand' and b.type = 'family' and c.type = 'series' LIMIT 200",
        (error, result) => {
            if(error) throw error;
           return res.send(result) 
        })
    })
    app.get("/api/getfamiliesbybrand/:slug", (req, res) => { 
        const { slug } = req.params;
        database.query("SELECT b.* FROM `product_heirarchy` as a, product_heirarchy as b WHERE a.slug = '"+slug+"' AND b.parent_ID = a.ID AND a.type='brand' AND b.type='family' LIMIT 200",
        (error, result) => {
            if(error) throw error;
           return res.send(result) 
        })
    })
    app.get("/api/getseriesbybrand/:slug", (req, res) => {
        const { slug } = req.params;
        database.query("SELECT c.* FROM `product_heirarchy` as a, product_heirarchy as b, product_heirarchy as c WHERE a.slug = '"+slug+"' AND b.parent_ID = a.ID AND c.parent_ID = b.ID AND a.type='brand' AND b.type='family' AND c.type='series' LIMIT 200",
        (error, result) => {
            if(error) throw error;
           return res.send(result) 
        })
    })
}