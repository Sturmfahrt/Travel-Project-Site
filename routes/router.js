const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    res.render('index');
});
router.get('/about', (req, res) => {
    res.render('about');
});
router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/signup', (req, res) => {
    res.render('signup');
})
// GET route after registering
router.get('/profile', function (req, res, next) {
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
                    return res.render('profile', {user_username: user.username, user_email: user.email});
                }
            }
        });
});
router.get('/profile/json', function (req, res, next) {
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
                    return res.send({user_username: user.username, user_email: user.email});
                }
            }
        });
});
router.get('/logout', (req, res, next) => {
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
router.get('/getUsername', (req, res, next) => {
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
router.post('/login', (req, res, next) => {
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
router.post('/signup', (req, res) => {
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

module.exports = router;