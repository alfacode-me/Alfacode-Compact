var router = require('express').Router();
var moment = require('moment');
var modelUsers = require('../../../model/users');
var fs = require('fs');
var path = require('path');
var multer = require('multer');

var upload = multer({
    dest: "temp/"
});

module.exports = {
    path: '/backend/profile',
    router: router
};

router.get("/edit", function (req, res) {
    res.render("backend/profile/edit", {
        title: "Ubah Profile",
        subtitle: "mengelola profil pengguna",
        layout: "backend",
        plugin: {
            froalaEditor: false
        },
        src: {
            js: "profile"
        }
    })

});

router.post("/save", upload.single("img"), function (req, res) {
    var formData = req.body;
    if (req.file) {
        formData.img = res.locals.user._id + path.extname(req.file.originalname);
        fs.renameSync(req.file.destination + req.file.filename, "public/backend/img/profile/" + res.locals.user._id + path.extname(req.file.originalname));
    }
    if (res.locals.user.img) formData.img = res.locals.user.img;
    formData._id = res.locals.user._id;
    modelUsers.update(formData, function (data) {
        if (data.status) {
            res.json({
                status: true
            })
        } else {
            res.json({
                status: false
            })
        }
    })
});