const {app,db} = require('./Setup')
//SignIn Routes
const {SignInRoutes} = require('./Routes');
SignInRoutes(app, db);

const {appRoutes} = require('./Routes');
appRoutes(app, db);

// User Profile Routes
const {UserProfileRoutes} = require('./Routes');
UserProfileRoutes(app,db);

// TableList For Department
const {TableListRoutes} = require('./Routes');
TableListRoutes(app,db);

//Department Wise Routes
const {documentcontrolRoutes} = require('./Routes');

const {engineeringRoutes} = require('./Routes');

const {executiveRoutes} = require('./Routes');

const {facilitiesandmaintenanceRoutes} = require('./Routes');

const {financeRoutes} = require('./Routes');

const {humanresourcesRoutes} = require('./Routes');
humanresourcesRoutes(app, db);

const {informationservicesRoutes} = require('./Routes');

const {marketingRoutes} = require('./Routes');
marketingRoutes(app, db);

const {productionRoutes} = require('./Routes');
productionRoutes(app, db);

const {productioncontrolRoutes} = require('./Routes');

const {purchasingRoutes} = require('./Routes');
purchasingRoutes(app, db);

const {qualityassuranceRoutes} = require('./Routes');

const {researchanddevelopmentRoutes} = require('./Routes');

const {salesRoutes} = require('./Routes');

const {shippingandreceivingRoutes} = require('./Routes');

const {tooldesignRoutes} = require('./Routes');



// Logout Routes
const {LogoutRoutes} = require('./Routes');
LogoutRoutes(app, db);






db.on('error', (err) => {
    if (err){
        console.log(err)
        console.log('Connection with database was not made, Server stalled!');
    }
});
