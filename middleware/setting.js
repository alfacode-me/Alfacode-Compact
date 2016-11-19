var router = require('express').Router();
var modelSetting = require('../model/setting');

module.exports = {
    path: '/',
    router: router
};

router.use("/", function (req, res, next) {
    res.locals.req = req;
    modelSetting.get((dt) => {
        res.locals.setting = dt.page;
        next();
    });
});