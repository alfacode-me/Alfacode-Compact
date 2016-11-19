var router = require('express').Router();

module.exports = {
    path: '/auth',
    router: router
};

router.use('/login', function (req, res, next) {
    if (req.cookies['authentication']) {
        res.redirect('/backend')
    } else {
        next()
    }
})

router.use('/logout', function (req, res, next) {
    if (req.cookies['authentication']) {
        next()
    } else {
        res.redirect('/auth/login')
    }
})