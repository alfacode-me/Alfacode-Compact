var router = require('express').Router();

module.exports = {
    path: '/backend',
    router: router
};

router.get('/', function (req, res) {
    res.redirect('/backend/dashboard');
});

router.get('/dashboard', function (req, res) {
    res.render('backend/home', {
        title: 'Beranda',
        subtitle: 'ringkasan informasi',
        layout: 'backend',
        plugin: {
            froalaEditor: false
        },
        src: {
            js: 'home'
        }
    })
});