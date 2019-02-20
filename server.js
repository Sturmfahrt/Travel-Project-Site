const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var app = express();


app.set('view engine', 'pug'); // our template engine.
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/static')); // allows access to static files like images and css
//use sessions for tracking logins
app.use(session({
    secret: 'SLAV305',
    resave: true,
    saveUninitialized: false
}));
// include routes
var routes = require('./routes/router');
app.use('/', routes);
// connect to the mongo database
mongoose.connect('mongodb://webserver:Admin123@ds133275.mlab.com:33275/login-server');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('database connected')
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
});
// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});


const server = app.listen(8080, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});