
const config = require('../config.js')
const routes = require('../routes')
const Database = require('../services/database')

module.exports = function(app){

    const database = new Database(config.dev)
    app.get("/api/getmodel/:slug", (req, res) => {
        const { slug } = req.params;
        database.query(`SELECT * FROM products as a 
        WHERE a.slug = '${slug}' `,    
        (error, result) => {
            if(error) throw error;
           return res.send(result) 
        })
    })
    app.get("/api/getbrandbymodel/:slug", (req, res) => {
        const { slug } = req.params;
        database.query(`SELECT ph1.* FROM product_heirarchy as ph1, 
        product_heirarchy as ph2, 
        product_heirarchy as ph3
        INNER JOIN products as p
        ON p.parent_ID = ph3.ID
        WHERE p.slug = '${slug}'
        AND ph3.parent_ID = ph2.ID
        AND ph2.parent_ID = ph1.ID
        AND ph1.type = 'brand'
        AND ph2.type = 'family'
        AND ph3.type = 'series'`,    
        (error, result) => {
            if(error) throw error;
           return res.send(result) 
        })
    })
    app.get("/api/getfamilybymodel/:slug", (req, res) => {
        const { slug } = req.params;
        database.query(`SELECT ph2.* FROM 
        product_heirarchy as ph2, 
        product_heirarchy as ph3
        INNER JOIN products as p
        ON p.parent_ID = ph3.ID
        WHERE p.slug = '${slug}'
        AND ph3.parent_ID = ph2.ID
        AND ph2.type = 'family'
        AND ph3.type = 'series'`,    
        (error, result) => {
            if(error) throw error;
           return res.send(result) 
        })
    })
    app.get("/api/getseriesbymodel/:slug", (req, res) => {
        const { slug } = req.params;
        database.query(`SELECT ph3.* FROM 
            product_heirarchy as ph3
            INNER JOIN products as p
            ON p.parent_ID = ph3.ID
            WHERE p.slug = '${slug}'
            AND ph3.type = 'series'`,    
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