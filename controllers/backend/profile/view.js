var router = require('express').Router();
var moment = require('moment');
var modelUsers = require('../../../model/users');

module.exports = {
    path: '/backend/profile',
    router: router
};

router.get('/view', function (req, res) {
    res.render('backend/profile/view', {
        title: 'Lihat Profile',
        subtitle: 'informasi profil pengguna',
        layout: 'backend',
        plugin: {
            froalaEditor: false
        },
        src: {
            js: 'profile'
        }
    })
});