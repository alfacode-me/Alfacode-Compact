var Ds = require('nedb');
var Cryptr = require('cryptr');
var configApp = require('../config/app');

var cryptr = new Cryptr(configApp.secret);

var users = new Ds({
    filename: 'database/users.db',
    timestampData: true,
    autoload: true
});

users.ensureIndex({
    fieldName: 'username',
    unique: true
}, function (err) {
    if (err) console.log(err);
});

module.exports = {
    new: (user, callback) => {
        user.password = cryptr.encrypt(user.password);
        users.insert(doc, function (err, newUser) {
            if (err) {
                callback({
                    status: false
                })
            } else {
                callback({
                    status: true,
                    newUser: newUser
                })
            }
        });
    },
    update: (user, callback) => {
        user.password = cryptr.encrypt(user.password);
        users.update({
            _id: user._id
        }, {
            $set: user
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
    },
    get: (id, callback) => {
        users.findOne({
            _id: id
        }, (err, user) => {
            if (err) {
                callback({
                    status: false
                })
            } else {
                user.password = cryptr.decrypt(user.password);
                callback({
                    status: true,
                    user: user
                })
            }
        })
    },
    check: (username, callback) => {
        users.findOne({
            username: username
        }, function (err, user) {
            if (err) {
                callback({
                    status: false
                })
            } else {
                if (user) {
                    user.password = cryptr.decrypt(user.password);
                    callback({
                        status: true,
                        user: user
                    });
                } else {
                    callback({
                        status: false
                    })
                }
            }
        });
    }
};