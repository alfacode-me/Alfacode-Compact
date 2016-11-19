var router = require('express').Router();

module.exports = {
    path: '/auth/logout',
    router: router
};

router.post('/', (req, res, next) => {
    res.clearCookie('authentication');
    res.clearCookie('level');
    res.json({
        status: 1
    });
});