const {app,db} = require('./Setup')
const {SignInRoutes} = require('./Routes');
const {appRoutes} = require('./Routes');

SignInRoutes(app, db);
appRoutes(app, db);

//marketingRoutes(app, db);
//financeRoutes(app, db);

db.on('error', (err) => {
    if (err){
        console.log('Connection with database was not made, Server stalled!');
    }
});
