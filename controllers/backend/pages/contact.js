var router = require('express').Router();
var moment = require('moment');
var modelPages = require('../../../model/pages');
var modelUsers = require('../../../model/users');

module.exports = {
    path: '/backend/pages/contact',
    router: router
};

router.get('/', (req, res) => {
    modelPages.get('contact', (page) => {
        modelUsers.get(page.page.user, (user) => {
            page.page.user = user.user;
            res.locals.contact = page.page;
            res.render('backend/pages/contact', {
                title: 'Halaman "Kontak"',
                subtitle: 'mengelola halaman "Kontak"',
                layout: 'backend',
                plugin: {
                    froalaEditor: true
                },
                src: {
                    js: 'pages'
                }
            });
        });
    });
});

router.post('/save', (req, res) => {
    var data = req.body;
    data.subid = 'contact';
    data.user = res.locals.user._id;
    modelPages.update('contact', data, (dt) => {
        if (dt.status == 1) {
            res.json({
                status: 1
            });
        } else {
            res.json({
                status: 0
            })
        }
    })
});