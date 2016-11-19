var router = require('express').Router();
var modelPages = require('../../model/pages');

module.exports = {
    path: '/',
    router: router
};

router.get('/client', (req, res, next) => {
    modelPages.get("client", (data) => {
        res.locals.page = data.page;
        res.locals.pageTitle = "Klien";
        res.render('frontend/client');
    });
});