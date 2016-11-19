var Ds = require('nedb');

var pages = new Ds({
    filename: 'database/pages.db',
    timestampData: true,
    autoload: true
});

pages.ensureIndex({
    fieldName: 'subid',
    unique: true
}, function (err) {
    if (err) console.log(err);
});

module.exports = {
    get: (subid, callback) => {
        pages.findOne({
            subid: subid
        }, (err, page) => {
            if (err) {
                callback({
                    status: false
                })
            } else {
                callback({
                    status: true,
                    page: page
                })
            }
        })
    },
    update: (subid, data, callback) => {
        pages.update({
            subid: subid
        }, {
            $set: data
        }, {}, function (err, numReplaced) {
            if (err) {
                callback({
                    status: false
                });
            } else {
                callback({
                    status: true
                });
            }
        });
    }
};