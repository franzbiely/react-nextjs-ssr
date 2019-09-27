const routes = require('next-routes')
                                                    
module.exports = routes()         
.add('categoryPage', '/:slug', 'categories') 
.add('categoryBrandFilter', '/:slug/:brand', 'categories')
.add('brands','/:brand', 'brands')
.add('family','/:brand/:family', 'family')
.add('series',':series', 'series')
.add('model','/:model')
 
        
