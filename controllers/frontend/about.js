var router = require('express').Router();
var modelPages = require('../../model/pages');

module.exports = {
    path: '/',
    router: router
};

router.get('/about-us', (req, res, next) => {
    modelPages.get("about", (data) => {
        res.locals.page = data.page;
        res.locals.pageTitle = "Tentang Kami";
        res.render("frontend/about");
    });
});