// SignIn
const SignInRoutes = require('./SignInRoutes');

// User Profile
const appRoutes = require('./appRoutes.js')

const UserProfileRoutes = require('./UserProfileRoutes.js')
const TableListRoutes = require('./TableListRoutes.js');

//Department Wise Routes
const documentcontrolRoutes = require('./Department Wise Routes/documentcontrolRoutes');
const engineeringRoutes = require('./Department Wise Routes/engineeringRoutes');
const executiveRoutes = require('./Department Wise Routes/executiveRoutes');
const facilitiesandmaintenanceRoutes = require('./Department Wise Routes/facilitiesandmaintenanceRoutes');
const financeRoutes = require('./Department Wise Routes/financeRoutes');
const humanresourcesRoutes = require('./Department Wise Routes/humanresourcesRoutes');
const informationservicesRoutes = require('./Department Wise Routes/informationservicesRoutes');
const marketingRoutes = require('./Department Wise Routes/marketingRoutes');
const productionRoutes = require('./Department Wise Routes/productionRoutes');
const productioncontrolRoutes = require('./Department Wise Routes/productioncontrolRoutes');
const purchasingRoutes = require('./Department Wise Routes/purchasingRoutes');
const qualityassuranceRoutes = require('./Department Wise Routes/qualityassuranceRoutes');
const researchanddevelopmentRoutes = require('./Department Wise Routes/researchanddevelopmentRoutes');
const salesRoutes = require('./Department Wise Routes/salesRoutes');
const shippingandreceivingRoutes = require('./Department Wise Routes/shippingandreceivingRoutes');
const tooldesignRoutes = require('./Department Wise Routes/tooldesignRoutes');

//Logout 
const LogoutRoutes = require('./LogoutRoutes.js')


module.exports = {
    // SignIn
    SignInRoutes,
    appRoutes,

    // User Profile
    UserProfileRoutes,
    
    TableListRoutes,
    
    //Department Wise Routes
    documentcontrolRoutes,
    engineeringRoutes,
    executiveRoutes,
    facilitiesandmaintenanceRoutes,
    financeRoutes,
    humanresourcesRoutes,
    informationservicesRoutes,
    marketingRoutes,
    productionRoutes,
    productioncontrolRoutes,
    purchasingRoutes,    
    qualityassuranceRoutes,
    researchanddevelopmentRoutes,
    salesRoutes,
    shippingandreceivingRoutes,
    tooldesignRoutes,

    //Logout 
    LogoutRoutes,
}