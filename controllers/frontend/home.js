var router = require('express').Router();

module.exports = {
    path: '/',
    router: router
};

router.get('/', (req, res, next) => {
    res.locals.pageTitle = "Home";
    res.render('frontend/home');
});