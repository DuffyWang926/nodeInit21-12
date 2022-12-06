const Koa = require('koa')
const app = new Koa();
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const cors = require('koa2-cors')



// var now = Date.now();

// (async () => {
//     var dog = await Pet.create({
//         id: 'd-' + now,
//         name: 'Odie',
//         gender: false,
//         birth: '2008-08-08',
//         createdAt: now,
//         updatedAt: now,
//         version: 0
//     });
//     console.log('created: ' + JSON.stringify(dog));
// })();

// (async () => {
//     var pets = await Pet.findAll({
//         where: {
//             name: 'Gaffey'
//         }
//     });
//     console.log(`find ${pets.length} pets:`);
//     for (let p of pets) {
//         console.log(JSON.stringify(p));
//     }
// })();



// async function test() {
//     var user = await userModel.create({
//         id: 'g-' + now,
//         name: 'Gaffey',
//         gender: false,
//         birth: '2007-07-07',
//         createdAt: now,
//         updatedAt: now,
//         version: 0
//     });
//     console.log('created: ' + JSON.stringify(user));
    
// }

// test()






app.use(cors());

app.use(bodyParser({
    enableTypes:['json', 'form', 'text'],
    encode: "utf-8",
    jsonLimit:'50mb'
  }));
// app.use(bodyParser.urlencoded({limit: '5000mb', extended: true}));
// app.use(bodyParser.json());

app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');