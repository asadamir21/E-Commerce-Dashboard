const jwt_util = require('../utils/jwt-utils');

module.exports = (app, db) => {
    app.get('/TableList', function(req, res){
        const User = jwt_util.verify(req.cookies.sessionToken)
        res.send(User.LoginID.profile.Name)        
    });
}