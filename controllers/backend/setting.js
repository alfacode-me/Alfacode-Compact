var router = require('express').Router();
var moment = require('moment');
var modelSetting = require('../../model/setting');

module.exports = {
    path: '/backend/setting',
    router: router
};

router.get('/', (req, res) => {
    res.render('backend/setting', {
        title: 'Halaman "Pengaturan"',
        subtitle: 'mengelola pengaturan website',
        layout: 'backend',
        plugin: {
            froalaEditor: false
        },
        src: {
            js: 'setting'
        }
    });
    // modelPages.get('contact', (page) => {
    //     modelUsers.get(page.page.user, (user) => {
    //         page.page.user = user.user;
    //         res.locals.contact = page.page;
    //         res.render('backend/setting', {
    //             title: 'Halaman "Pengaturan"',
    //             subtitle: 'mengelola pengaturan website',
    //             layout: 'backend',
    //             plugin: {
    //                 froalaEditor: false
    //             },
    //             src: {
    //                 js: 'setting'
    //             }
    //         });
    //     });
    // });
});

router.post('/save', (req, res) => {
    var data = req.body;
    modelSetting.update(data, (dt) => {
        if (dt.status) {
            res.json({
                status: 1
            });
        } else {
            res.json({
                status: 0
            })
        }
    });
});