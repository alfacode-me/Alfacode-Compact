var router = require('express').Router();
var moment = require('moment');
var modelPages = require('../../../model/pages');
var modelUsers = require('../../../model/users');

module.exports = {
    path: '/backend/pages/client',
    router: router
};

router.get('/', (req, res) => {
    modelPages.get('client', (page) => {
        modelUsers.get(page.page.user, (user) => {
            page.page.user = user.user;
            page.page.datetime = moment(page.page.updatedAt).locale('id').format('dddd, DD MMMM YYYY, HH: mm: ss');
            res.locals.page = page.page;
            res.render('backend/pages/client', {
                title: 'Halaman "Klien"',
                subtitle: 'mengelola halaman "Klien"',
                layout: 'backend',
                plugin: {
                    froalaEditor: true
                },
                src: {
                    js: 'pages'
                }
            });
        });
    })
});

router.post('/save', (req, res) => {
    var data = {
        name: req.body.name,
        content: req.body.content.toString(),
        user: res.locals.user._id
    };
    modelPages.update('client', data, (data) => {
        if (data.status) {
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