var router = require('express').Router();
var modelPages = require('../../model/pages');

module.exports = {
    path: '/',
    router: router
};

router.get('/contact', (req, res, next) => {
    modelPages.get("contact", (data) => {
        res.locals.page = data.page;
        res.locals.pageTitle = "Kontak";
        res.render('frontend/contact');
    });
});