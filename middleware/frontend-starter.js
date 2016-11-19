var router = require('express').Router();
var modelPages = require('../model/pages');

module.exports = {
    path: '/',
    router: router
};

router.use("/", function (req, res, next) {
    res.locals.req = req;
    modelPages.get("contact", (dt) => {
        res.locals.contact = dt.page;
        next();
    });
});