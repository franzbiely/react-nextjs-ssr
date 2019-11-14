
const config = require('../config.js')
const routes = require('../routes')
const Database = require('../services/database')

module.exports = function(app){

    const database = new Database(config.dev)
    app.get("/api/getbrands/:slug", (req, res) => {
        const { slug } = req.params;
        database.query("SELECT * FROM product_heirarchy WHERE slug='"+slug+"' AND type='brand'",
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
    // app.get("/api/getcategorybybrand/:slug", (req, res) => { 
    //     const { slug } = req.params;
    //     database.query("",
    //     (error, result) => {
    //         if(error) throw error;
    //        return res.send(result) 
    //     })
    // })
    app.get("/api/getproductsbybrand/:slug/page/:page", (req, res) => { 
        const { slug, page } = req.params;
        let pageNum = parseInt(page) - 1;
        database.query(`select aa.* from products as aa, 
        product_heirarchy as a, 
        product_heirarchy as b,  
        product_heirarchy as c 
        INNER JOIN product_heirarchy 
        WHERE a.slug ='${slug}' 
        AND a.ID = b.parent_ID 
        AND b.ID = c.parent_ID 
        AND c.ID = aa.parent_ID 
        AND a.type = 'brand' 
        and b.type = 'family' 
        and c.type = 'series' LIMIT 20 OFFSET ${pageNum ? pageNum * 20 : 0}`,
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
}