var router = require('express').Router();
var modelFiles = require('../../../model/files');

var fs = require('fs');
var path = require('path');
var multer = require('multer');

var upload = multer({
    dest: "temp/"
});

module.exports = {
    path: '/backend/files',
    router: router
};

router.get('/add', (req, res) => {
    res.render('backend/files/add', {
        title: 'Tambah File',
        subtitle: 'menambahkan file ke daftar files',
        layout: 'backend',
        plugin: {
            froalaEditor: false
        },
        src: {
            js: 'files'
        }
    });
});

router.post('/save', upload.single('file'), (req, res) => {
    formData = req.body
    if (req.file) {
        formData.download = 0
        formData.user = req.cookies['authentication']
        if (formData.name != '') {
            formData.name = formData.name
        } else {
            formData.name = path.basename(req.file.originalname, path.extname(req.file.originalname))
        }
        formData.ext = path.extname(req.file.originalname)

        modelFiles.new(formData, (dt) => {
            if (dt.status) {
                fs.renameSync(req.file.destination + req.file.filename, 'public/files/' + dt.file._id + formData.ext);
                res.json({
                    status: true
                })
            } else {
                res.json({
                    status: false
                })
            }
        });
    } else {
        res.json({
            status: false
        })
    }
});