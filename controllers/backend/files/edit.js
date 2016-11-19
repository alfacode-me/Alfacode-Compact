var router = require('express').Router();
var modelFiles = require('../../../model/files');

module.exports = {
    path: '/backend/files',
    router: router
};

router.get('/edit/:id', (req, res) => {
    modelFiles.get(req.params.id, (data) => {
        res.locals.file = data.file;
        res.render('backend/files/edit', {
            title: 'Edit File',
            subtitle: 'mengubah file yang dipilih',
            layout: 'backend',
            plugin: {
                froalaEditor: false
            },
            src: {
                js: 'files'
            }
        });
    });
});

router.post('/update/:id', (req, res) => {
    var formData = req.body;
    modelFiles.update(formData.id, formData, (data) => {
        if (data.status) {
            res.json({
                status: 1
            });
        } else {
            res.json({
                status: 0
            });
        }
    });
});