const express = require('express');
const passport = require('passport')
const path = require('path');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const redis = require('redis')
const session = require('express-session')
let RedisStore = require('connect-redis')(session)

const {PORT} = require('../config.json');
const app = express();

// const redisClient = redis.createClient({
//   host: 'localhost',
//   port: 3000,
//   password: process.env.REDIS_STORE_SECRET,
//   db: 1,
// })
// redisClient.unref()
// redisClient.on('error', function (er) {
//   console.trace('Here I am'); 
//   console.error(er.stack); 
// });

// app.use(session({
//     store: new RedisStore({ 
//       client: redisClient, 
//     }),
//     secret: process.env.REDIS_STORE_SECRET,
//     resave: false,
//     saveUninitialized: false
//   })
// )

// app.use(passport.initialize())
// app.use(passport.session())

// Then use it before your routes are set up:
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/', express.static(path.join(__dirname, '..','build')));
app.use('/static', express.static(path.join(__dirname, '..','static')));
console.log(path.join(__dirname, '..','static'))

app.listen(PORT, () => console.log('Node server listening on Port '+ PORT));

module.exports = app