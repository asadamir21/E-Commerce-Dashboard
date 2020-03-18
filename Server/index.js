const {app,db} = require('./Setup')
const {SignInRoutes} = require('./Routes');
const {appRoutes} = require('./Routes');
const {UserProfileRoutes} = require('./Routes');
const {TableListRoutes} = require('./Routes');
const {LogoutRoutes} = require('./Routes');

SignInRoutes(app, db);
appRoutes(app, db);
UserProfileRoutes(app,db);
TableListRoutes(app,db);
LogoutRoutes(app, db);
//marketingRoutes(app, db);
//financeRoutes(app, db);

db.on('error', (err) => {
    if (err){
        console.log('Connection with database was not made, Server stalled!');
    }
});
