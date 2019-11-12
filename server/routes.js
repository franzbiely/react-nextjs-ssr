const routes = require('next-routes')
const routesImplemention = routes()

routesImplemention.add('/:param1', 'index')
routesImplemention.add('/:param1/:param2', 'archive')
routesImplemention.add('/:param1/page/:page', 'index')

module.exports = routesImplemention