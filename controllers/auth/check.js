var router = require('express').Router();
var modelUsers = require('../../model/users');

module.exports = {
    path: '/auth/check',
    router: router
};

router.post('/', (req, res) => {
    modelUsers.check(req.body.username, (data) => {
        var user = data.user;
        if (data.status) {
            if (req.body.password == user.password) {
                if (req.body.remember == 1) {
                    res.cookie('authentication', user._id, {
                        httpOnly: true
                    });
                    res.cookie('level', user.level, {
                        httpOnly: true
                    });
                } else {
                    res.cookie('authentication', user._id, {
                        maxAge: 3600000,
                        httpOnly: true
                    });
                    res.cookie('level', user.level, {
                        maxAge: 3600000,
                        httpOnly: true
                    })
                }
                res.json({
                    status: true
                })
            } else {
                res.json({
                    status: false
                })
            }
        } else {
            res.json({
                status: false
            })
        }
    })
})