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
    const routerHandler = routes.getRequestHandler(app, ({req, res, route, query}) => {
        if(req.params[0]==='/_next/webpack-hmr' || req.params[0] === '/favicon.ico') {
            return;
        }

        let params = req.params[0].split('/')
        params = params.filter((el) => el !== '')
        const database = new Database(config.dev)
        if(params.length === 1) {
            database.query("SELECT type FROM product_heirarchy WHERE slug = '"+params[0]+"'")
            .then(result => {
                if(result.length > 0) {
                    console.log(result)
                    app.render(req, res, 'categories', query)
                }
                else {
                    app.render(req, res, '_error', query)
                }
                return database.close();
            })
            .catch(() => database.close())
        }
        else if (params.length === 2) {
            database.query("SELECT type \
                            FROM products as a, products as b \
                            WHERE a.slug = '" + params[1] + "' \
                            AND b.slug ='"+params[0]+"' \
                            AND b.ID = a.parent_ID")
            .then(result => {
                if(result.length > 0) {
                    app.render(req, res, 'model', query)
                }
                else {
                    return database.query("SELECT ID from categories WHERE slug ='"+params[0]+"'")
                }
            })
            .catch(() => database.close())
        }
    })
    server.get('*', routerHandler)
    server.listen(3000, ()=>console.log('Techlitic running on http://localhost:3000/'))
})