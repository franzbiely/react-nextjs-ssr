
const config = require('../config.js')
const routes = require('../routes')
const Database = require('../services/database')

module.exports = function(app){

    const database = new Database(config.dev)
    app.get("/api/getmodelsbyseries/:slug", (req, res) => {
        const { slug } = req.params;
        database.query("SELECT a.* FROM products as a, product_heirarchy as b \
        INNER JOIN product_heirarchy \
        WHERE b.slug='"+slug+"' \
        AND b.type='series' \
        AND a.parent_ID = b.ID LIMIT 200",    
        (error, result) => {
            if(error) throw error;
           return res.send(result) 
        })
    })
    
}