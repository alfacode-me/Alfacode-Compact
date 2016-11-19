var router = require('express').Router();
var modelNews = require('../../../model/news');

module.exports = {
    path: '/backend/news',
    router: router
};

router.get('/edit/:id', (req, res) => {
    modelNews.get(req.params.id, (data) => {
        res.locals.news = data.news;
        res.render('backend/news/edit', {
            title: 'Edit Berita',
            subtitle: 'mengubah berita yang dipilih',
            layout: 'backend',
            plugin: {
                froalaEditor: true
            },
            src: {
                js: 'news'
            }
        });
    });
});

router.post('/edit/save/:id', (req, res) => {
    formData = req.body;
    formData.user = res.locals.user._id;
    formData.status = false;
    modelNews.update(req.params.id, formData, (dt) => {
        if (dt.status) res.json({
            status: 1
        })
        else res.json({
            status: 0
        })
    });
});

router.post('/edit/publish/:id', (req, res) => {
    formData = req.body;
    formData.user = res.locals.user._id;
    formData.status = true;
    modelNews.update(req.params.id, formData, (dt) => {
        if (dt.status) res.json({
            status: 1
        })
        else res.json({
            status: 0
        })
    });
});