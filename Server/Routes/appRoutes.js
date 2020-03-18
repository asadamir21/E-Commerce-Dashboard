const { userProfileSchema } = require('./JoiSchema/entrySchema');

const jwt_util = require('../utils/jwt-utils');

module.exports = (app, db, io) => {

    app.use((req, res, next) => {
        const token = jwt_util.verify(req.cookies.sessionToken); 
        if (token === false){
            res.send('Error222');
            //res.redirect('/SignIn')
            //res.writeHead(301, { "Location": "http://" + req.headers['host'] + '/SignIn' });
            //res.redirect('/user_profile');
            //return res.send();
            //res.status(401).send(false);
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
