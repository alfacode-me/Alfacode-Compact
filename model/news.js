var Ds = require('nedb');

var news = new Ds({
    filename: 'database/news.db',
    timestampData: true,
    autoload: true
});

module.exports = {
    save: (data, callback) => {
        news.insert(data, (err, nw) => {
            if (err) {
                callback({
                    status: false
                });
            } else {
                callback({
                    status: true,
                    news: nw
                });
            }
        });
    },
    get: (id, callback) => {
        news.findOne({
            _id: id
        }, (err, nw) => {
            if (err) {
                callback({
                    status: false
                });
            } else {
                callback({
                    status: true,
                    news: nw
                });
            }
        });
    },
    getAll: (req, skip, callback) => {
        if (req == 'backend') {
            news.find({}).sort({
                createdAt: -1
            }).skip(skip).limit(5).exec((err, allNews) => {
                if (err) {
                    callback({
                        status: false
                    });
                } else {
                    callback({
                        status: true,
                        allNews: allNews
                    });
                }
            });
        } else {
            news.find({
                status: true
            }).sort({
                createdAt: -1
            }).skip(skip).limit(5).exec((err, allNews) => {
                if (err) {
                    callback({
                        status: false
                    });
                } else {
                    callback({
                        status: true,
                        allNews: allNews
                    });
                }
            });
        }
    },
    search: (query, skip, callback) => {
        news.find({
            $or: [{
                status: true,
                title: new RegExp(query)
            }, {
                status: true,
                content: new RegExp(query)
            }]
        }).sort({
            createdAt: -1
        }).skip(skip).limit(5).exec((err, allNews) => {
            if (err) {
                callback({
                    status: false
                });
            } else {
                callback({
                    status: true,
                    allNews: allNews
                });
            }
        });
    },
    searching: (query, callback) => {
        news.find({
            $or: [{
                status: true,
                title: new RegExp(query)
            }, {
                status: true,
                content: new RegExp(query)
            }]
        }).sort({
            createdAt: -1
        }).exec((err, allNews) => {
            if (err) {
                callback({
                    status: false
                });
            } else {
                callback({
                    status: true,
                    allNews: allNews
                });
            }
        });
    },
    random: (req, callback) => {
        if (req == 'backend') {
            news.find({}).limit(5).exec((err, allNews) => {
                if (err) {
                    callback({
                        status: false
                    });
                } else {
                    callback({
                        status: true,
                        allNews: allNews
                    });
                }
            });
        } else {
            news.find({
                status: true
            }).limit(5).exec((err, allNews) => {
                if (err) {
                    callback({
                        status: false
                    });
                } else {
                    callback({
                        status: true,
                        allNews: allNews
                    });
                }
            });
        }
    },
    count: (callback) => {
        news.count({
            status: true
        }, (err, total) => {
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
    countSearch: (query, callback) => {
        news.count({
            $or: [{
                status: true,
                title: new RegExp(query)
            }, {
                status: true,
                content: new RegExp(query)
            }]
        }, (err, total) => {
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
    update: (id, data, callback) => {
        news.update({
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
    index: (id, nav, callback) => {
        news.find({
            status: true
        }).sort({
            createdAt: -1
        }).exec((err, nw) => {
            if (err) {
                callback({
                    status: false
                });
            } else {
                var idx = false;
                nw.forEach(function (element, index) {
                    if (element._id == id) {
                        idx = index;
                    }
                }, this);
                if (nav == 'next') {
                    callback({
                        status: true,
                        id: nw[idx - 1]._id
                    });
                }
                if (nav == 'before') {
                    callback({
                        status: true,
                        id: nw[idx + 1]._id
                    });
                }
            }
        });
    },
    delete: (id, callback) => {
        news.remove({
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