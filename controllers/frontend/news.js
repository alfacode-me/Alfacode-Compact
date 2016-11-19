var router = require('express').Router();
var moment = require('moment');
var path = require('path');
var modelNews = require('../../model/news');
var modelUsers = require('../../model/users');

module.exports = {
    path: '/',
    router: router
};

router.get('/news', (req, res) => {
    res.redirect('/news/list/1')
});

router.get('/news/list/:pagi', (req, res) => {
    if (req.query.search) {
        var search = req.query.search;
        res.locals.search = true;
        res.locals.query = search;
        modelNews.countSearch(search, (data) => {
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
            modelNews.search(search, res.locals.pagi.skip, (data) => {
                var allNews = data.allNews;
                allNews.forEach(function (item, index) {
                    allNews[index].datetime = moment(allNews[index].createdAt).locale('id').format('dddd, DD MMM YYYY, hh:mm');
                    modelUsers.get(item.user, (user) => {
                        allNews[index].user = user.user;
                    });
                    res.locals.news = data.allNews;
                    if (res.locals.pagi.status) {
                        modelNews.getAll('frontend', 0, (data) => {
                            var lastest = data.allNews;
                            lastest.forEach(function (item, index) {
                                lastest[index].datetime = moment(lastest[index].createdAt).locale('id').format('dddd, DD MMM YYYY, hh:mm');
                                modelUsers.get(item.user, (user) => {
                                    lastest[index].user = user.user;
                                });
                                res.locals.newsLatest = lastest;
                                modelNews.random('frontend', (data) => {
                                    var random = data.allNews;
                                    random.forEach(function (item, index) {
                                        random[index].datetime = moment(random[index].createdAt).locale('id').format('dddd, DD MMM YYYY, hh:mm');
                                        modelUsers.get(item.user, (user) => {
                                            random[index].user = user.user;
                                        });
                                    }, this);
                                    res.locals.newsRandom = random;
                                    res.locals.pageTitle = "Berita";
                                    res.render('frontend/news');
                                });
                            }, this);
                        });
                    } else {
                        res.render('errors/404');
                    }
                }, this);
            });
        });
    } else {
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
            modelNews.getAll('frontend', res.locals.pagi.skip, (data) => {
                var allNews = data.allNews;
                allNews.forEach(function (item, index) {
                    allNews[index].datetime = moment(allNews[index].createdAt).locale('id').format('dddd, DD MMM YYYY, hh:mm');
                    modelUsers.get(item.user, (user) => {
                        allNews[index].user = user.user;
                    });
                }, this);
                res.locals.news = data.allNews;
                if (res.locals.pagi.status) {
                    modelNews.getAll('frontend', 0, (data) => {
                        var lastest = data.allNews;
                        lastest.forEach(function (item, index) {
                            lastest[index].datetime = moment(lastest[index].createdAt).locale('id').format('dddd, DD MMM YYYY, hh:mm');
                            modelUsers.get(item.user, (user) => {
                                lastest[index].user = user.user;
                            });
                        }, this);
                        res.locals.newsLatest = lastest;
                        modelNews.random('frontend', (data) => {
                            var random = data.allNews;
                            random.forEach(function (item, index) {
                                random[index].datetime = moment(random[index].createdAt).locale('id').format('dddd, DD MMM YYYY, hh:mm');
                                modelUsers.get(item.user, (user) => {
                                    random[index].user = user.user;
                                });
                            }, this);
                            res.locals.newsRandom = random;
                            res.locals.pageTitle = "Berita";
                            res.render('frontend/news');
                        });
                    });
                } else {
                    res.render('errors/404');
                }
            });
        });
    }
});

router.get('/news/:id', (req, res) => {
    modelNews.get(req.params.id, function (dt) {
        if (dt.news != null) {
            var news = dt.news;
            news.datetime = moment(news.createdAt).locale('id').format('dddd, DD MMM YYYY, hh:mm');
            modelUsers.get(news.user, (user) => {
                news.user = user.user;
            });
            res.locals.news = news;
            modelNews.getAll('frontend', 0, (data) => {
                var lastest = data.allNews;
                lastest.forEach(function (item, index) {
                    lastest[index].datetime = moment(lastest[index].createdAt).locale('id').format('dddd, DD MMM YYYY, hh:mm');
                    modelUsers.get(item.user, (user) => {
                        lastest[index].user = user.user;
                    });
                }, this);
                res.locals.newsLatest = lastest;
                modelNews.random('frontend', (data) => {
                    var random = data.allNews;
                    random.forEach(function (item, index) {
                        random[index].datetime = moment(random[index].createdAt).locale('id').format('dddd, DD MMM YYYY, hh:mm');
                        modelUsers.get(item.user, (user) => {
                            random[index].user = user.user;
                        });
                    }, this);
                    res.locals.newsRandom = random;
                    res.locals.titleNews = true;
                    res.locals.pageTitle = res.locals.news.title;
                    res.render('frontend/news-full');
                });
            });
        } else {
            res.redirect('/errors/404');
        }
    });
});

router.get('/news/:id/:nav', (req, res) => {
    modelNews.index(req.params.id, req.params.nav, (data) => {
        res.redirect('/news/' + data.id);
    });
});
