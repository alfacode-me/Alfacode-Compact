module.exports = (hbs) => {
    hbs.registerHelper("pagifiles", function (page) {
        if (page.total >= 1) {
            var out = "<li><a href='/backend/files/list/1'><i class='fa fa-angle-double-left'></i></a></li>";
            for (var index = 1; index <= page.total; index++) {
                if (index >= parseInt(page.active) - 2 && index <= parseInt(page.active) + 2) {
                    if (parseInt(page.active) == index) {
                        out = out + "<li class='active'><a href='/backend/files/list/'" + index + "'>" + index + "</a></li>"
                    } else {
                        out = out + "<li><a href='/backend/files/list/" + index + "'>" + index + "</a></li>"
                    }
                }
            }
            out = out + "<li><a href='/backend/files/list/" + page.total + "'><i class='fa fa-angle-double-right'></i></a></li>"
        } else {
            out = "<li class='disabled'><a href='#'><i class='fa fa-angle-double-left'></i></a></li>";
            out = out + "<li class='disabled'><a href='#'><i class='fa fa-angle-double-right'></i></a></li>";
        }
        return out
    });

    hbs.registerHelper("paginews", function (page) {
        if (page.total >= 1) {
            var out = "<li><a href='/backend/news/list/1'><i class='fa fa-angle-double-left'></i></a></li>";
            for (var index = 1; index <= page.total; index++) {
                if (index >= parseInt(page.active) - 2 && index <= parseInt(page.active) + 2) {
                    if (parseInt(page.active) == index) {
                        out = out + "<li class='active'><a href='/backend/news/list/'" + index + "'>" + index + "</a></li>"
                    } else {
                        out = out + "<li><a href='/backend/news/list/" + index + "'>" + index + "</a></li>"
                    }
                }
            }
            out = out + "<li><a href='/backend/news/list/" + page.total + "'><i class='fa fa-angle-double-right'></i></a></li>"
        } else {
            out = "<li class='disabled'><a href='#'><i class='fa fa-angle-double-left'></i></a></li>";
            out = out + "<li class='disabled'><a href='#'><i class='fa fa-angle-double-right'></i></a></li>";
        }
        return out;
    });

    hbs.registerHelper("frontendpaginews", function (page) {
        if (page.total >= 1) {
            var out = "<li><a href='/news/list/1' class='waves-effect waves-light'><i class='fa fa-angle-double-left'></i></a></li>";
            for (var index = 1; index <= page.total; index++) {
                if (index >= parseInt(page.active) - 2 && index <= parseInt(page.active) + 2) {
                    if (parseInt(page.active) == index) {
                        out = out + "<li><span class='current waves-effect waves-light'>" + index + "</span></li>"
                    } else {
                        out = out + "<li><a href='/news/list/" + index + "' class='waves-effect waves-light'>" + index + "</a></li>"
                    }
                }
            }
            out = out + "<li><a class='waves-effect waves-light' href='/news/list/" + page.total + "'><i class='fa fa-angle-double-right'></i></a></li>"
        } else {
            out = "<li><a href='#' class='disabled waves-effect waves-light'><i class='fa fa-angle-double-left'></i></a></li>";
            out = out + "<li><a href='#' class='disabled waves-effect waves-light'><i class='fa fa-angle-double-right'></i></a></li>";
        }
        return out
    });
    hbs.registerHelper("frontendpaginewssearch", function (page, query) {
        if (page.total >= 1) {
            var out = `<li><a href='/news/list/1?search=${query}' class='waves-effect waves-light'><i class='fa fa-angle-double-left'></i></a></li>`;
            for (var index = 1; index <= page.total; index++) {
                if (index >= parseInt(page.active) - 2 && index <= parseInt(page.active) + 2) {
                    if (parseInt(page.active) == index) {
                        out = `${out}<li><span class='current waves-effect waves-light'>${index}</span></li>`;
                    } else {
                        out = `${out}<li><a href='/news/list/${index}?search=${query}' class='waves-effect waves-light'>${index}</a></li>`;
                    }
                }
            }
            out = `${out}<li><a class='waves-effect waves-light' href='/news/list/${page.total}?search=${query}'><i class='fa fa-angle-double-right'></i></a></li>`;
        } else {
            out = "<li><a href='#' class='disabled waves-effect waves-light'><i class='fa fa-angle-double-left'></i></a></li>";
            out = out + "<li><a href='#' class='disabled waves-effect waves-light'><i class='fa fa-angle-double-right'></i></a></li>";
        }
        return out
    });
};