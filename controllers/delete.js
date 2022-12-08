const fs = require('fs')
const { promises } = require('fs');
const model = require('../model');
var deleteGif = async (ctx, next) => {
    console.log('deleteGif start')
    const id = ctx.query.id;
    let productModel = model.product
    let filePath = '../products/' + id + '.gif'
    try{
        fs.unlink(filePath, function(err) {
            if (err) {
                console.log(err)
            }else{
                opperateFlag = true 
            }
        });

    }catch(e){
        console.log(e)
    }
    await  productModel.destroy({
        where: {
            productId:id
        }
    })
    
    let code = 200
   
    ctx.response.body = {
        code,
    }

};

module.exports = {
    'GET /api/delete': deleteGif,
};