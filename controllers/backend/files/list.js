var router = require('express').Router();
var moment = require('moment');
var modelFiles = require('../../../model/files');
var modelUsers = require('../../../model/users');

module.exports = {
    path: '/backend/files',
    router: router
};

router.get('/list', (req, res) => {
    res.redirect('/backend/files/list/1');
});

router.get('/list/:pagi', (req, res) => {
    modelFiles.count((data) => {
        pagi = {};
        pagi.data = data.total;
        pagi.active = req.params.pagi;
        pagi.total = Math.ceil(pagi.data / 5);
        pagi.skip = 5 * (pagi.active - 1);
        if (pagi.active > 1 && pagi.active > pagi.total) {
            pagi.status = false;
        } else {
            pagi.status = true;
        }
        res.locals.pagi = pagi;
        modelFiles.getAll(res.locals.pagi.skip, (data) => {
            var allFiles = data.allFiles;
            allFiles.forEach(function (item, index) {
                allFiles[index].datetime = moment(allFiles[index].createdAt).locale('id').format('dddd, DD MMM YYYY, hh:mm');
                modelUsers.get(item.user, (user) => {
                    allFiles[index].user = user.user;
                });
            }, this);
            res.locals.files = data.allFiles;
            if (res.locals.pagi.status == 1) {
                res.render('backend/files/list', {
                    title: 'Daftar Files',
                    subtitle: 'informasi daftar file',
                    layout: 'backend',
                    plugin: {
                        froalaEditor: false
                    },
                    src: {
                        js: 'files'
                    }
                })
            } else {
                res.render('errors/404');
            }
        });
    });
});