
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
    app.get("/api/getmodelsbyfamily/:slug", (req, res) => {
        const { slug } = req.params;
        database.query("SELECT p.* FROM product_heirarchy as a, \
        product_heirarchy as b \
        LEFT OUTER JOIN products as p \
        ON b.ID = p.parent_ID \
        WHERE b.type = 'series' \
        AND a.type= 'family' \
        AND a.slug = '"+slug+"' \
        AND a.ID = b.parent_ID LIMIT 200",
        (error, result) => {
            if(error) throw error;
           return res.send(result) 
        })
    })

    app.get("/api/getmodelsbyfamily/:slug/page/:page", (req, res) => {
        const { slug, page } = req.params;
        let pageNum = parseInt(page) - 1;
        database.query(`SELECT p.* FROM product_heirarchy as a, 
        product_heirarchy as b 
        LEFT OUTER JOIN products as p 
        ON b.ID = p.parent_ID 
        WHERE b.type = 'series' 
        AND a.type= 'family' 
        AND a.slug = '${slug}' 
        AND a.ID = b.parent_ID LIMIT 20 OFFSET ${pageNum ? pageNum * 20 : 0}`,
        (error, result) => {
            if(error) throw error;
           return res.send(result) 
        })
    })
    
}