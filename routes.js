const routes = require('next-routes')
                                                    
module.exports = routes()         
.add('/:slug', '/') 
.add('/:slug/:brand', '/')
.add('test', '/notfound', '_error')
// .add('family','/:slug/:brand/:series', '/')
// .add('series','/:series', 'index')
// .add('model','/:index')
 
        
