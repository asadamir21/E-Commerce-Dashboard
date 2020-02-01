const {app,db} = require('./Setup')
const {marketingRoutes, financeRoutes} = require('./Routes');

marketingRoutes(app, db);
financeRoutes(app, db);

db.on('error', (err) => {
    if (err){
        console.log('Connection with database was not made, Server stalled!');
    } else {
        console.log('Database successfully connected');
    }
});
