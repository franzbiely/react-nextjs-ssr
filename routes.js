const routes = require('next-routes')
                                                    
module.exports = routes()                           
// .add('/')                                       
.add('categories', 'categories/:slug')    
// .add('categories/:slug', 'categories/:slug/:brand')
        
