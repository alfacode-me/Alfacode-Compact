var router = require('express').Router();
var fs = require('fs');
var path = require('path');
var Chance = require('chance');
var multer = require('multer');

var upload = multer({
    dest: "temp/"
});
var chance = new Chance();

module.exports = {
    path: '/upload',
    router: router
};

router.post('/images/save', upload.single('file'), (req, res) => {
    pathImg = 'uploads/images/' + req.file.filename + '-' + chance.string(10) + path.extname(req.file.originalname)
    fs.renameSync(req.file.path, 'public/' + pathImg);
    res.json({
        link: '/src/' + pathImg
    })
})

router.post('/images/delete', (req, res) => {
    fs.unlink('public/uploads/images/' + path.basename(req.body.src), (err) => {
        if (err) res.json({
            status: 0
        })
        else res.json({
            status: 1
        })
    })
})