const SignInRoutes = require('./SignInRoutes');
const appRoutes = require('./appRoutes.js')
const LogoutRoutes = require('./LogoutRoutes.js')
const UserProfileRoutes = require('./UserProfileRoutes.js')
const {TableListRoutes} = require('./TableListRoutes.js');

//const marketingRoutes = require('./marketingRoutes');
//const financeRoutes = require('./financeRoutes');

module.exports = {
    SignInRoutes,
    appRoutes,
    UserProfileRoutes,
    LogoutRoutes,
    //marketingRoutes,
    //financeRoutes
}