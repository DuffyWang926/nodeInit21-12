const fs = require('fs');
const multer = require('@koa/multer')

function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            if(path.includes('upload')){
                router.post(path, multer().single('gif'),mapping[url]);
            }else{
                router.post(path, mapping[url]);
            }
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router) {
    var files = fs.readdirSync(__dirname + '/controllers');
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    for (var f of js_files) {
        let mapping = require(__dirname + '/controllers/' + f);
        addMapping(router, mapping);
    }
}

module.exports = function (dir) {
    let
        controllers_dir = dir || 'controllers', 
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};