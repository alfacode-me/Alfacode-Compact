var Ds = require('nedb');

var setting = new Ds({
    filename: 'database/setting.db',
    timestampData: true,
    autoload: true
});

module.exports = {
    get: (callback) => {
        setting.findOne({
            subid: 'setting'
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
    update: (data, callback) => {
        setting.update({
            subid: 'setting'
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