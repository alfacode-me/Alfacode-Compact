var router = require('express').Router();
var moment = require('moment');
var modelNews = require('../../model/news');
var modelFiles = require('../../model/files');
var modelUsers = require('../../model/users');

module.exports = {
    path: '/backend/search',
    router: router
};

router.get('/', function (req, res) {
    modelNews.searching(req.query.query, (data) => {
        var allNews = data.allNews;
        allNews.forEach(function (item, index) {
            allNews[index].datetime = moment(allNews[index].createdAt).locale('id').format('dddd, DD MMM YYYY');
            modelUsers.get(item.user, (user) => {
                allNews[index].user = user.user;
            });
            if (allNews[index].status) {
                allNews[index].status = "Terbit";
            } else {
                allNews[index].status = "Tidak Terbit";
            }
        }, this);
        res.locals.news = data.allNews;
        modelFiles.searching(req.query.query, (data) => {
            var allFiles = data.allFiles;
            allFiles.forEach(function (item, index) {
                allFiles[index].datetime = moment(allFiles[index].createdAt).locale('id').format('dddd, DD MMM YYYY');
                modelUsers.get(item.user, (user) => {
                    allFiles[index].user = user.user;
                });
            }, this);
            res.locals.files = data.allFiles;
            res.render('backend/search', {
                title: 'Pencarian',
                subtitle: req.query.query,
                layout: 'backend',
                plugin: {
                    froalaEditor: false
                },
                src: {
                    js: 'search'
                }
            });
        });
    });
});