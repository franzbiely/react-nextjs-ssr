
const config = require('../config.js')
const routes = require('../routes')
const Database = require('../services/database')

module.exports = function(app){

    const database = new Database(config.dev)
    app.get("/api/getfamily/:slug", (req, res) => {
        const { slug } = req.params;
        database.query("SELECT * FROM product_heirarchy WHERE slug='"+slug+"' AND type='family'",
        (error, result) => {
            if(error) throw error;
           return res.send(result) 
        })
    })
    app.get("/api/getseriesbyfamily/:slug", (req, res) => {
        const { slug } = req.params;
        database.query("SELECT b.* FROM product_heirarchy as a, product_heirarchy as b \
        WHERE a.slug='"+slug+"' \
        AND b.type='series' \
        AND a.ID = b.parent_ID",
        (error, result) => {
            if(error) throw error;
           return res.send(result) 
        })
    })
}