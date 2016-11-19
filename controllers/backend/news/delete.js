var router = require('express').Router();
var modelNews = require('../../../model/news');

module.exports = {
    path: '/backend/news',
    router: router
};

router.post('/delete/:id', (req, res) => {
    modelNews.delete(req.params.id, (dt) => {
        if (dt.status) {
            res.json({
                status: 1
            })
        } else {
            res.json({
                status: 0
            })
        }
    });
});