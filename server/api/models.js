
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
    app.get("/api/getcategorybymodel/:slug", (req, res) => {
        const { slug } = req.params;
        database.query(`SELECT c.* FROM product_heirarchy as ph3
        INNER JOIN products as p ON p.parent_ID = ph3.ID
        INNER JOIN product_heirarchy as ph2 ON ph2.ID = ph3.parent_ID
        INNER JOIN product_heirarchy as ph1 ON ph1.ID = ph2.parent_ID
        INNER JOIN categories as c ON c.ID = ph1.parent_ID
        WHERE p.slug = '${slug}'
        AND ph3.type = 'series'
        AND ph2.type = 'family'
        AND ph1.type = 'brand'`,    
        (error, result) => {
            if(error) throw error;
           return res.send(result) 
        })
    })
    app.get("/api/getvariantsbymodel/:slug", (req, res) => {
        const { slug } = req.params;
        database.query(`SELECT v.* FROM products as p
        INNER JOIN variant as v ON p.ID = v.parent_ID
        WHERE p.slug = '${slug}'`,    
        (error, result) => {
            if(error) throw error;
           return res.send(result) 
        })
    })
    app.get("/api/getspecsbymodel/:slug", (req, res) => {
        const { slug } = req.params;
        database.query(`SELECT pm.*
        FROM products as p
        INNER JOIN variant as v ON p.ID = v.parent_ID
        INNER JOIN product_meta as pm ON pm.product_ID = v.ID
        WHERE p.slug = '${ slug }'`,    
        (error, result) => {
            if(error) throw error;
           return res.send(result) 
        })
    })
    app.get("/api/getSimilarBrandsByModel/:slug", (req, res) => {
        const { slug } = req.params;
        database.query(`SELECT pm.*
        FROM products as p
        INNER JOIN variant as v ON p.ID = v.parent_ID
        INNER JOIN product_meta as pm ON pm.product_ID = v.ID
        WHERE p.slug = '${ slug }'`,    
        (error, result) => {
            if(error) throw error;
           return res.send(result) 
        })
    })
}