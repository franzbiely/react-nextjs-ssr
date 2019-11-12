
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
}