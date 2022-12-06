const model = require('../model');
const _ = require('lodash')

const fn_banner = async (ctx, next) => {
    let productModel = model.user

    let users = await  productModel.findAll({
        where: {
        }
    })
    console.log(`find ${users} users:`);
    
    ctx.response.body = {
        bannerList:users
    }
};

const fn_home = async (ctx, next) => {
    console.log('GET /api/home start')
    let productModel = model.product

    let products = await  productModel.findAll({
        where: {
        }
    })
    console.log(`find ${products} products:`);
    let catList = []
    let imgList = Array.isArray(products) && products.map( (v,i) =>{
        let res = {
            imgId:v.productId,
            imgUrl:v.imgUrl,
            title:v.title,
            author:v.author,
            downSum:v.sum,
            updatedAt:v.updatedAt,
            type:v.type
        }
        if(v.type == 2){
            catList.push(res)
        }

        return res
    })
    imgList.sort((a,b) =>{
        return a.downSum - b.downSum
    })
    let imgListEnd = imgList.slice(0,3)
    let nextList = _.cloneDeep(imgList)
    nextList.sort((a,b) =>{
        return b.updatedAt - a.updatedAt
    })
    let newList = nextList.slice(0,3)
    console.log(imgList)
    console.log(nextList)
    let dataRes = [
        {
            title:'热门',
            type:0,
            imgList:imgListEnd
        },
        {
            title:'最新',
            type:1,
            imgList:newList
        },
        
    ]
    if(catList?.length > 0){
        dataRes.push(
            {
                title:'猫咪表情包',
                type:2,
                imgList:catList
            }

        )
    }
    ctx.response.body = dataRes
    
};

module.exports = {
    'GET /api/home': fn_home,
    'GET /api/banner': fn_banner,

};