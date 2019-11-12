const next = require('next')
const server = require('express')()
const bodyParser = require('body-parser')
const glob = require('glob')

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const config = require('./config.js')
const routes = require('./routes')
const Database = require('./services/database')

require('./api/brands')(server);
require('./api/categories')(server);
require('./api/models')(server);
require('./api/families')(server);
require('./api/series')(server);

app.prepare()
.then(()=> {
    
    server.use(bodyParser.urlencoded({extended: false}))
    server.use(bodyParser.json())

    server.use((req, res,next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
        next()
    })
    server.get("/:slug/page/:page", (req, res) => {
        const { slug, page } = req.params;
        return app.render(res, req, 'categories')
    })
    const routerHandler = routes.getRequestHandler(app, ({req, res, route, query}) => {
        if(req.params[0]==='/_next/webpack-hmr' || req.params[0] === '/favicon.ico') {
            return;
        }

        let params = req.params[0].split('/')
        params = params.filter((el) => el !== '')
        const database = new Database(config.dev)
        if(params.length === 1) {
            database.query("SELECT type FROM product_heirarchy WHERE slug = '"+params[0]+"'; \
            SELECT * FROM categories WHERE slug = '"+params[0]+"'")
            .then(result => {
                
                if(result[0].length > 0) {
                        return app.render(req, res, 'brand', query)
                }
                else if(result[1].length > 0){
                        return app.render(req, res, 'categories', query)
                }
                else {
                    app.render(req, res, '_error', query)
                }
                return database.close();
            })
            .catch(() => database.close())
        }
        else if (params.length === 2) {
            database.query(
            "SELECT type FROM product_heirarchy\
             WHERE slug='"+params[1]+"'; SELECT * FROM products as a\
             WHERE a.slug='"+params[1]+"'")
            .then(result => {
                if(result[0].length > 0 && result[1].length === 0 ) {
                    if(result[0][0].type === 'family'){
                        database.query("SELECT a.* FROM product_heirarchy as a, product_heirarchy as b INNER JOIN product_heirarchy WHERE b.slug='"+params[0]+"' AND a.slug = '"+params[1]+"' AND b.type='brand' AND a.type='family' AND b.ID = a.parent_ID LIMIT 1")
                        .then(result => { 
                            if(result.length > 0){
                                return app.render(req, res, 'family', query)
                            }else{
                                return app.render(req, res, 'notfound', query)
                            }
                        })
                    }
                    else if(result[0][0].type === 'series'){
                        database.query("SELECT c.* FROM product_heirarchy as a, product_heirarchy as b, product_heirarchy as c INNER JOIN product_heirarchy WHERE b.slug='"+params[0]+"' AND c.slug = '"+params[1]+"' AND b.type='brand' AND a.type='family' and c.type='series' AND b.ID = a.parent_ID AND a.ID = c.parent_ID LIMIT 1")
                        .then(result => { 
                            if(result.length > 0){
                                return app.render(req, res, 'series', query)
                            }else{
                                return app.render(req, res, 'notfound', query)
                            }
                        })
                    }
                    else{
                        return app.render(req, res, 'categories', query)
                    }
                }
                else if(result[1].length > 0) {
                   database.query("SELECT a.* FROM products as a, product_heirarchy as b, product_heirarchy as c, product_heirarchy as d INNER JOIN product_heirarchy WHERE b.slug='"+params[0]+"' AND a.slug = '"+params[1]+"' AND b.type='brand' AND c.type='family' AND d.type='series' AND b.ID = c.parent_ID AND c.ID = d.parent_ID AND a.parent_ID = d.ID LIMIT 1")
                   .then(result => {
                       if(result.length > 0){
                        return app.render(req, res, 'model', query)
                       }
                       else{
                        return app.render(req, res, 'notfound', query)
                       }
                   }
                   )
                    
                }
            })
            .catch(() => database.close())
        }
    })
    server.get('*', routerHandler)
    server.listen(3000, ()=>console.log('Techlitic running on http://localhost:3000/'))
})
















