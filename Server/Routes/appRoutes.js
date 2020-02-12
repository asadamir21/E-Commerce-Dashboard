//const { userProfileSchema } = require('./JoiSchema/entrySchema');

const jwt_util = require('../utils/jwt-utils');
//const multer = require('multer')
//const path = require('path')

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//         cb(null, req.body.number+'.png')
//     }
//   })
   

//var upload = multer({ storage: storage })
b
module.exports = (app, db, io) => {
    app.use((req, res, next) => {
        console.log('hello')
        const token = jwt_util.verify(req.cookies.sessionToken); 
        if (token === false){
            res.status(401).send(false);
        } else {
            req.profile = token
            next()
        }
    })
    app.get('/adb',(req,res) => {
        console.log(req.profile)
        res.send('')
    })
}
