const fs = require('fs')
const model = require('../model');
const axios = require('axios')
var fn_upload = async (ctx, next) => {
    let body = ctx.request.body
    const { type, name, theme, gif} = body
    // console.log('body',body)
    
    // console.log('ctx.file',ctx.file)
    let now = new Date().getTime() + ''
    let code = 200
    let writePath = '../products/' + now + '.gif'
    // let filePath = 'http://127.0.0.1:3000/api/product/' + now
    let filePath = 'https://www.mengshikejiwang.top/api/product/' + now
    if(ctx.file ){
        let fileBuffer = ctx.file ? ctx.file.buffer : 
        console.log('fileBuffer',fileBuffer)
        try{
            fs.writeFile(writePath, fileBuffer, function(err) {
                if (err) {
                    throw err;
                }
            });

        }catch{

        }
        console.log('end')

    }else{
        bytes = gif
        // console.log(bytes)
        fs.writeFile(writePath, gif,"binary", function(err) {
            if (err) {
                throw err;
            }
        });
    }
    

    let productModel = model.product
    let sum = Math.floor(Math.random()*10+1) + ''
    console.log(now,'now')
    console.log(typeof now,'now')
    await  productModel.create({
        productId:now,
        imgUrl: filePath,
        type,
        author: 'a',
        title: name,
        description: '',
        sum,
        createdAt: now,
        updatedAt: now,
    })

   
    ctx.response.body = {
        code,
    }

};

let uploadFile = async (ctx, next) => {
    let body = ctx.request.body
    
    console.log('body',body)
    
    console.log('ctx.file',ctx.file)
    console.log('ctx.content',ctx.content)
    let now = new Date().getTime() + ''
    let code = 200
    
   
    ctx.response.body = {
        code,
    }

};

let uploadLocalFile = async (ctx, next) => {
    let body = ctx.request.body
    console.log("body",body)
    let { theme, name, title, themeType, filePath, author } = body
    let titleList = title.split('-')
    title = titleList.length > 0 ? titleList[0] : ''
    let byteData = ''
    if( themeType == '宠物' ){
        themeType = 2
    }
    try{
        fs.readFile(filePath,"binary", function(err,readData) {
            if (err) {
                throw err;
            }else{
                byteData = readData
                let writePath = 'test2.gif'
                fs.writeFile(writePath, byteData, 'binary',function(err,data) {
                    if (err) {
                        throw err;
                    }else{
                        // console.log('write', data)
                    }
                });
                // let url = 'http://127.0.0.1:3000/api/upload'
                let url = 'https://www.mengshikejiwang.top/api/upload'
                let data ={
                             'gif':byteData,
                             "name":name || 'name',
                             "type": themeType || 'type',
                             "theme":theme || 'theme',
                             author
                        }
                let headers = {
                    'Content-Type': 'multipart/form-data'
                }
                axios.post(url,data,headers)
                
            }
        });
        
    }catch(e){
        console.log(e)
    }
    let code = 200
    ctx.response.body = {
        code,
    }

};

module.exports = {
    'POST /api/upload': fn_upload,
    'POST /api/uploadFile': uploadFile,
    'GET /api/uploadLocalFile': uploadLocalFile,
};