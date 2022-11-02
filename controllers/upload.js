const fs = require('fs')
const model = require('../model');
const axios = require('axios')
var fn_upload = async (ctx, next) => {
    let body = ctx.request.body
    const { type, name, theme, gif} = body
    console.log('body',body)
    
    console.log('ctx.file',ctx.file)
    let now = new Date().getTime() + ''
    let code = 200
    let writePath = '../products/' + now + '.gif'
    let filePath = 'http://127.0.0.1:3000/product/' + now
    // let filePath = 'https://www.mengshikejiwang.top/api/product/' + now
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
        console.log(bytes)
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
    // console.log('ctx',ctx)
    let now = new Date().getTime() + ''
    let code = 200
    // let writePath = '../products/' + now + '.gif'
    let writePath = '../products/' + now + '.txt'
    let filePath = 'http://127.0.0.1:3000/product/' + now
    // let filePath = 'https://www.mengshikejiwang.top/api/product/' + now
    // try{
    //     fs.writeFile(writePath, body,"binary", function(err) {
    //         if (err) {
    //             throw err;
    //         }
    //     });
    // }catch(e){
    //     console.log(e)

    // }
   
    ctx.response.body = {
        code,
    }

};

let uploadLocalFile = async (ctx, next) => {
    let body = ctx.request.body
    // let path = 'C:\\gifProducts\\' + 'test.gif'
    let path = 'test.gif'
    let byteData = ''

    try{
        fs.readFile(path,"binary", function(err,readData) {
            if (err) {
                throw err;
            }else{
                byteData = readData
                console.log('byteData',byteData)
                // byteData = Buffer.from(data)
                // console.log('byteData',byteData)
                let writePath = 'test2.gif'
                fs.writeFile(writePath, byteData, 'binary',function(err,data) {
                    if (err) {
                        throw err;
                    }else{
                        console.log('write', data)
                    }
                });
                let url = 'http://127.0.0.1:3000/api/upload'
                let data ={
                             'gif':byteData,
                             "name":'dd',
                             "type": '1',
                             "theme":'dd',
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
    ctx.response.body = {
        code,
    }

};

module.exports = {
    'POST /api/upload': fn_upload,
    'POST /api/uploadFile': uploadFile,
    'GET /api/uploadLocalFile': uploadLocalFile,
};