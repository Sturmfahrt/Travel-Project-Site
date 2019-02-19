const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user.js');

app.set('view engine', 'pug'); // our template engine.
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/static')); // allows access to static files like images and css
//use sessions for tracking logins
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false
}));
mongoose.connect('mongodb://webserver:Admin123@ds133275.mlab.com:33275/login-server');

const server = app.listen(8080, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/signup', (req, res) => {
    res.render('signup');
})
// GET route after registering
app.get('/profile', function (req, res, next) {
    User.findById(req.session.userId)
        .exec(function (error, user) {
            if (error) {
                return next(error);
            } else {
                if (user === null) {
                    var err = new Error('Not authorized! Go back!');
                    err.status = 400;
                    return next(err);
                } else {
                    return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
                }
            }
        });
});
app.get('/logout', (req, res, next) => {
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if(err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});
app.get('/getUsername', (req, res, next) => {
    User.findById(req.session.userId)
        .exec(function (error, user) {
            if (error) {
                return next(error);
            } else {
                if (user === null) {
                    return res.send('User');
                } else {
                    return res.send(user.username);
                }
            }
        });
});
app.post('/login', (req, res, next) => {
    console.log('signin triggered');
    console.log(JSON.stringify(req.body));
    
    if (req.body.logemail && req.body.logpassword) {
        User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
            if (error || !user) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;
                return res.redirect('/profile');
            }
        });
    }
});
app.post('/signup', (req, res) => {
    console.log('signup triggered');
    console.log(JSON.stringify(req.body));
    
    if (req.body.email && req.body.username && req.body.password) {
        var userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }

        // use schema.create to insert data into the db
        User.create(userData, (err, user) => {
            if (err) {
                return next(err)
            } else {
                req.session.userId = user._id;
                return res.redirect('/profile');
            }
        });
    }
});