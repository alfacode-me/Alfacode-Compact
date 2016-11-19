module.exports = (hbs) => {
    hbs.registerHelper("listfiles", function (files) {
        var render = "";
        var no = 0;
        files.forEach((fl) => {
            no++;
            render = render + `<tr>
                <th style="vertical-align: middle" scope="row">${no}</th>
                <td style="vertical-align: middle">${fl.name}</td>
                <td style="vertical-align: middle">${fl.datetime}</td>
                <td style="vertical-align: middle">${fl.download}</td>
                <td><small><a href="/files/detail/${fl.id}" class="waves-effect waves-light btn purple">Detail</a></small></td>
            </tr>`
        });
        return new hbs.SafeString(render);
    });
    hbs.registerHelper("detailfile", function (fl) {
        var render = `<tr>
                <td style="vertical-align: middle; width:25%">Nama File</td>
                <td style="vertical-align: middle">${fl.name}</td>
            </tr><tr>
                <td style="vertical-align: middle; width:25%">Exstensi File</td>
                <td style="vertical-align: middle">${fl.ext}</td>
            </tr><tr>
                <td style="vertical-align: middle; width:25%">Pengunggah</td>
                <td style="vertical-align: middle">${fl.user.fullname}</td>
            </tr><tr>
                <td style="vertical-align: middle; width:25%">Total Download</td>
                <td style="vertical-align: middle">${fl.download}</td>
            </tr><tr>
                <td style="vertical-align: middle; width:25%">Keterangan File</td>
                <td style="vertical-align: middle">${fl.desc}</td>
            </tr>`
        return new hbs.SafeString(render);
    });
};