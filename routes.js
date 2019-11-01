const routes = require('next-routes')
                                                    
module.exports = routes()         
.add('/:slug', '/') 
.add('/:slug/:brand', '/')