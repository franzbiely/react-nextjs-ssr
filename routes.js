const routes = require('next-routes')
                                                    
module.exports = routes()         
.add('categoryPage', '/:slug', '/') 
.add('brands','/:slug', '/')
.add('categoryBrandFilter', '/:slug/:brand', '/')
// .add('family','/:brand/:family', '/')
// .add('series','/:series', 'index')
// .add('model','/:index')
 
        
