var router = require('express').Router();
var moment = require('moment');
var path = require('path');
var modelFiles = require('../../model/files');
var modelUsers = require('../../model/users');

module.exports = {
    path: '/',
    router: router
};

router.get('/files', (req, res) => {
    res.redirect('/files/list/1')
});

router.get('/files/list/:pagi', (req, res) => {
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
                res.locals.pageTitle = "Files";
                res.render('frontend/files');
            } else {
                res.render('errors/404');
            }
        });
    });
});

router.get('/files/detail/:id', (req, res) => {
    modelFiles.get(req.params.id, (data) => {
        var file = data.file;
        modelUsers.get(file.user, (user) => {
            file.user = user.user;
        });
        res.locals.file = file;
        res.locals.titleFiles = true;
        res.locals.pageTitle = res.locals.file.name;
        res.render('frontend/files-detail');
    });
});

router.get('/files/download/:id', (req, res) => {
    modelFiles.get(req.params.id, (data) => {
        modelFiles.update(req.params.id, {
            download: data.file.download + 1
        }, (dt) => {});
        res.download(path.join(__dirname, "../../public/files/" + data.file._id + data.file.ext), data.file.name + data.file.ext);
    });
});