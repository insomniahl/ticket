/**
 * Created by insomniahl on 16/9/18.
 */
var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic("../ticket")).listen(8080, function(){
    console.log('Server running on 8080...');
});
