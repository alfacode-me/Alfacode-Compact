var router = require('express').Router();
var modelNews = require('../../../model/news');
var modelUsers = require('../../../model/users');

module.exports = {
    path: '/backend/news',
    router: router
};

router.get('/create', (req, res) => {
    res.render('backend/news/create', {
        title: 'Buat Berita',
        subtitle: 'membuat berita baru',
        layout: 'backend',
        plugin: {
            froalaEditor: true
        },
        src: {
            js: 'news'
        }
    });
});

router.post('/save', (req, res) => {
    formData = req.body;
    formData.user = res.locals.user._id;
    formData.status = false;
    modelNews.save(formData, (dt) => {
        if (dt.status) res.json({
            status: 1
        })
        else res.json({
            status: 0
        })
    });
});

router.post('/publish', (req, res) => {
    formData = req.body;
    formData.user = res.locals.user._id;
    formData.status = true;
    modelNews.save(formData, (dt) => {
        if (dt.status) res.json({
            status: 1
        })
        else res.json({
            status: 0
        })
    });
});