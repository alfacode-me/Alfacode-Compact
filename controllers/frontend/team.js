var router = require('express').Router();
var modelPages = require('../../model/pages');

module.exports = {
    path: '/',
    router: router
};

router.get('/team', (req, res, next) => {
    modelPages.get("team", (data) => {
        res.locals.page = data.page;
        res.locals.pageTitle = "Staff";
        res.render('frontend/team');
    });
});