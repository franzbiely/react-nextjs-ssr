
const config = require('../config.js')
const routes = require('../routes')
const Database = require('../services/database')

module.exports = function(app){

    const database = new Database(config.dev)
    app.get("/api/getseries/:slug", (req, res) => {
        const { slug } = req.params;
        database.query("SELECT * FROM product_heirarchy WHERE slug='"+slug+"' AND type='series'",
        (error, result) => {
            if(error) throw error;
           return res.send(result) 
        })
    })
    app.get("/api/getmodelsbyseries/:slug", (req, res) => {
        const { slug } = req.params;
        database.query("SELECT b.* FROM product_heirarchy as a \
        LEFT OUTER JOIN products as b \
        ON a.id = b.parent_ID \
        WHERE a.slug = '"+slug+"' \
        LIMIT 200",    
        (error, result) => {
            if(error) throw error;
           return res.send(result) 
        })
    })
    app.get("/api/getmodelsbyseries/:slug/page/:page", (req, res) => {
        const { slug, page } = req.params;
        let pageNum = parseInt(page) - 1;
        database.query(`SELECT b.* FROM product_heirarchy as a \
        LEFT OUTER JOIN products as b \
        ON a.id = b.parent_ID \
        WHERE a.slug = '${slug}' \
        LIMIT 20 OFFSET ${pageNum ? pageNum * 20 : 0}`,    
        (error, result) => {
            if(error) throw error;
           return res.send(result) 
        })
    })
}