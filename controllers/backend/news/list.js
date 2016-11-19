var router = require('express').Router();
var moment = require('moment');
var modelNews = require('../../../model/news');
var modelUsers = require('../../../model/users');

module.exports = {
    path: '/backend/news',
    router: router
};

router.get('/list', (req, res) => {
    res.redirect('/backend/news/list/1')
});

router.get('/list/:pagi', (req, res) => {
    modelNews.count((data) => {
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
        modelNews.getAll('backend', res.locals.pagi.skip, (data) => {
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
            if (res.locals.pagi.status == 1) {
                res.render('backend/news/list', {
                    title: 'Daftar Berita',
                    subtitle: 'daftar berita terbaru',
                    layout: 'backend',
                    plugin: {
                        froalaEditor: true
                    },
                    src: {
                        js: 'news'
                    }
                });
            } else {
                res.render('errors/404');
            }
        });
    });
});