
const config = require('../config.js')
const routes = require('../routes')
const Database = require('../services/database')

module.exports = function(app){

    const database = new Database(config.dev)
    app.get("/api/getcategory", (req, res) => {
        database.query("SELECT * FROM categories WHERE parent_ID IS NULL LIMIT 200",
        (error, result) => {
            if(error) throw error;
           return res.send(result) 
        })
    })
    app.get("/api/getsubcategoriesbycategory/:slug", (req, res) => { 
        const { slug } = req.params;
        database.query("SELECT b.* FROM `categories` as a, categories as b WHERE a.slug='"+slug+"' AND a.parent_ID is null AND a.ID = b.parent_ID LIMIT 200",
        (error, result) => {
            if(error) throw error;
           return res.send(result) 
        })
    })
}