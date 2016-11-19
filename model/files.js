var Ds = require('nedb');

var files = new Ds({
    filename: 'database/files.db',
    timestampData: true,
    autoload: true
});

module.exports = {
    new: (file, callback) => {
        files.insert(file, (err, file) => {
            if (err) {
                callback({
                    status: false
                });
            } else {
                callback({
                    status: true,
                    file: file
                });
            }
        });
    },
    searching: (query, callback) => {
        files.find({
            name: new RegExp(query)
        }).sort({
            createdAt: -1
        }).exec((err, allFiles) => {
            if (err) {
                callback({
                    status: false
                });
            } else {
                callback({
                    status: true,
                    allFiles: allFiles
                });
            }
        });
    },
    count: (callback) => {
        files.count({}, (err, total) => {
            if (err) {
                callback({
                    status: false
                });
            } else {
                callback({
                    status: true,
                    total: total
                });
            }
        });
    },
    get: (id, callback) => {
        files.findOne({
            _id: id
        }, (err, file) => {
            if (err) {
                callback({
                    status: false
                });
            } else {
                callback({
                    status: true,
                    file: file
                });
            }
        });
    },
    getAll: (skip, callback) => {
        files.find({}).sort({
            createdAt: -1
        }).skip(skip).limit(5).exec((err, allFiles) => {
            if (err) {
                callback({
                    status: false
                });
            } else {
                callback({
                    status: true,
                    allFiles: allFiles
                });
            }
        });
    },
    update: (id, data, callback) => {
        files.update({
            _id: id
        }, {
                $set: data
            }, {}, function (err, replaced) {
                if (err) {
                    callback({
                        status: false
                    });
                } else {
                    callback({
                        status: true,
                        replaced: replaced
                    });
                }
            });
    },
    delete: (id, callback) => {
        files.remove({
            _id: id
        }, {}, (err, removed) => {
            if (err) {
                callback({
                    status: false
                });
            } else {
                callback({
                    status: true,
                    removed: removed
                });
            }
        });
    }
};