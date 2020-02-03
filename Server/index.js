const {app,db} = require('./Setup')
const {SignInRoutes, marketingRoutes, financeRoutes} = require('./Routes');

SignInRoutes(app, db);
marketingRoutes(app, db);
financeRoutes(app, db);

db.on('error', (err) => {
    if (err){
        console.log('Connection with database was not made, Server stalled!');
    }
});
