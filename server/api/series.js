
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
    app.get("/api/getbrandbyseries/:slug", (req, res) => {
        const { slug } = req.params;
        database.query(`SELECT c.* FROM product_heirarchy as a, product_heirarchy as b, product_heirarchy as c
        WHERE a.slug = '${ slug }'
        AND a.parent_ID = b.ID
        AND b.parent_ID = c.ID
        AND b.type= 'family'
        AND c.type='brand'`,    
        (error, result) => {
            if(error) throw error;
           return res.send(result) 
        })
    })
    app.get("/api/getfamilybyseries/:slug", (req, res) => {
        const { slug } = req.params;
        database.query(`SELECT b.* FROM product_heirarchy as a, product_heirarchy as b
        WHERE a.slug = '${ slug }'
        AND a.parent_ID = b.ID
        AND b.type= 'family'`,    
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