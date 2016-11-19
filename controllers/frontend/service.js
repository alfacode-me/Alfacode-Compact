var router = require('express').Router();
var modelPages = require('../../model/pages');

module.exports = {
    path: '/',
    router: router
};

router.get('/service', (req, res, next) => {
    modelPages.get("service", (data) => {
        res.locals.page = data.page;
        res.locals.pageTitle = "Layanan";
        res.render('frontend/service');
    });
});