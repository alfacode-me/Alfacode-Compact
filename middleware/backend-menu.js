var router = require('express').Router();
var modelUsers = require('../model/users');

module.exports = {
    path: '/backend',
    router: router
};

router.use("/", function (req, res, next) {
    res.locals.menuleftbar = {
        dashboard: {
            text: "Beranda",
            link: "/backend/dashboard",
            icon: "mdi mdi-view-dashboard"
        },
        about: {
            text: "Tentang Kami",
            link: "/backend/pages/about",
            icon: "mdi mdi-domain"
        },
        service: {
            text: "Layanan",
            link: "/backend/pages/service",
            icon: "mdi mdi-certificate"
        },
        team: {
            text: "Staff",
            link: "/backend/pages/team",
            icon: "mdi mdi-lan"
        },
        client: {
            text: "Klien",
            link: "/backend/pages/client",
            icon: "mdi mdi-bank"
        },
        contact: {
            text: "Kontak",
            link: "/backend/pages/contact",
            icon: "mdi mdi-account-card-details"
        },
        setting: {
            text: "Pengaturan",
            link: "/backend/setting",
            icon: "mdi mdi-settings"
        },
        news: {
            text: "Berita",
            link: "/backend/news",
            icon: "mdi mdi-newspaper",
            menu: [{
                text: "Buat Berita",
                link: "/backend/news/create",
            }, {
                text: "Daftar Berita",
                link: "/backend/news/list",
            }]
        },
        files: {
            text: "Files",
            link: "/backend/files",
            icon: "mdi mdi-file-multiple",
            menu: [{
                text: "Tambah Files",
                link: "/backend/files/add",
            }, {
                text: "Daftar Files",
                link: "/backend/files/list",
            }]
        },
        profile: {
            text: "Profil",
            link: "/backend/profile",
            icon: "mdi mdi-account-settings",
            menu: [{
                text: "Lihat Profil",
                link: "/backend/profile/view",
            }, {
                text: "Ubah Profil",
                link: "/backend/profile/edit",
            }]
        }
    };
    next()
});