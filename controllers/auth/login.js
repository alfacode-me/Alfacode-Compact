var router = require('express').Router();

module.exports = {
    path: '/auth/login',
    router: router
};

router.get('/', function (req, res) {
    res.render('auth/login', {
        title: 'Masuk',
        layout: 'auth',
        src: {
            js: 'login'
        }
    })
});