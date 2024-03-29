const model = require('../model');
const fn_productList = async (ctx, next) => {
    let body = ctx.request.body
    const { type, size } = body
    let productModel = model.product
    let productList = []
    if(type < 2){
        productList = await  productModel.findAll({
            where: {
                
            }
        })
    }else if(type == 2){
        productList = await  productModel.findAll({
            where: {
                type:2
            }
        })
    }
    console.log(`productList.length`,productList.length);
    let imgList = Array.isArray(productList) && productList.map( (v,i) =>{
        let res = {
            imgId:v.id,
            imgUrl:v.imgUrl,
            title:v.title,
            author:v.author,
            downSum:v.sum,
            updatedAt:v.updatedAt
        }
        return res
    })
    if(type != 1){
        imgList.sort((a,b) =>{
            return a.downSum - b.downSum
        })
    }else if(type == 1){
        imgList.sort((a,b) =>{
            return a.updatedAt - b.updatedAt
        })
    }
    let procuctListEnd = []
    if(size){
        procuctListEnd = imgList.slice(0,size)
    }else{
        procuctListEnd = imgList
    }
    
    let dataRes = {
        productList:procuctListEnd,
    }
        
    ctx.response.body = dataRes
};

module.exports = {
    'POST /api/productlist': fn_productList
};