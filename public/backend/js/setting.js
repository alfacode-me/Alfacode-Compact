$(function () {
    $("#setting-save").click(function () {
        $("#setting-save").button("loading");
        var dt = {};
        dt.nameWebsite = $('#nameWebsite').val();
        $.post("/backend/setting/save", dt, function (data) {
            if (data.status == 1) {
                swal({
                    type: "success",
                    title: "Selamat data tersimpan !",
                    text: "Klik \"Lanjutkan !\" untuk memuat ulang halaman.",
                    confirmButtonText: "Lanjutkan !",
                    allowEscapeKey: false,
                    allowOutsideClick: false
                }).then(function () {
                    window.location = "/backend/setting"
                })
            } else {
                swal({
                    type: "error",
                    title: "Gagal menyimpan data !",
                    text: "Klik \"Cobalagi !\" untuk mencoba lagi, pastikan file sesuai.",
                    confirmButtonText: "Cobalagi !",
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                $("#setting-save").button("reset");
            }
        }, "json")
    });
});