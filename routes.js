const routes = require('next-routes')
                                                    
module.exports = routes()         
.add('category','/:slug/', '/') 
.add('/:slug/:brand', '/')
.add('/:slug/page/:page', '/') 
.add('/:slug/:brand/page/:page', '/') 
.add('test', '/notfound', '_error')