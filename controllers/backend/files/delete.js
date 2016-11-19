var router = require('express').Router();
var fs = require('fs');
var modelFiles = require('../../../model/files');

module.exports = {
    path: '/backend/files',
    router: router
};

router.post('/delete/:id', (req, res) => {
    modelFiles.get(req.params.id, (data) => {
        var file = data.file;
        modelFiles.delete(req.params.id, (data) => {
            if (data.status) {
                fs.unlink('public/files/' + file._id + file.ext, function (err) {
                    console.log(err);
                    if (err) res.json({
                        status: false
                    });
                    else res.json({
                        status: true
                    });
                });
            } else {
                res.json({
                    status: true
                });
            }
        });
    });
});