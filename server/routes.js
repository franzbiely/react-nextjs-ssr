const routes = require('next-routes')
const routesImplemention = routes()

routesImplemention.add('/:slug', 'index')
routesImplemention.add('/:param1/:param2', 'archive')

module.exports = routesImplemention