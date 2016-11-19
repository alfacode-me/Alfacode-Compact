var router = require('express').Router();
var modelUsers = require('../model/users');

module.exports = {
    path: '/backend',
    router: router
};

router.use("/", function (req, res, next) {
    if (req.cookies['authentication']) {
        res.locals.req = req;
        modelUsers.get(req.cookies['authentication'], (data) => {
            if (data.status) {
                res.locals.user = data.user;
            }
            next()
        })
    } else {
        res.redirect("/auth/login");
    }
});