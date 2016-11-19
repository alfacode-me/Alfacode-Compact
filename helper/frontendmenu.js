module.exports = (hbs) => {
    hbs.registerHelper("frontendmenu", function (path) {
        var menu = [{
            text: "Home",
            link: "/"
        }, {
            text: "Tentang Kami",
            link: "/about-us"
        }, {
            text: "Staff",
            link: "/team"
        }, {
            text: "Layanan",
            link: "/service"
        }, {
            text: "Klien",
            link: "/client"
        }, {
            text: "Berita",
            link: "/news/list/1"
        }, {
            text: "Files",
            link: "/files/list/1"
        }, {
            text: "Kontak",
            link: "/contact"
        }];
        var render = "";
        menu.forEach((mn) => {
            var cls = (path == mn.link) ? "active" : "";
            if (mn.text == "Files" && path.startsWith("/files")) {
                cls = "active";
            }
            if (mn.text == "Berita" && path.startsWith("/news")) {
                cls = "active";
            }
            render = render + `<li class="${cls}"><a href="${mn.link}">${mn.text}</a></li>`;
        });
        return new hbs.SafeString(render);
    });
};