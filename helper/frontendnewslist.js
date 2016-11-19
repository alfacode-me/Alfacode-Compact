module.exports = (hbs) => {
    hbs.registerHelper("frontendnewslist", function (news) {
        var render = "";
        news.forEach((ns) => {
            render = render + `<article class="post-wrapper format-quote">
                <div class="thumb-wrapper">
                    <blockquote>
                        <p><strong>${ns.title}</strong></p>
                        <footer>${ns.user.fullname}</footer>
                    </blockquote>
                    <div class="author-thumb waves-effect waves-light">
                        <a href="#"><img src="/src/backend/img/profile/${ns.user.img}" alt="${ns.user.fullname}"></a>
                    </div>
                    <span class="post-comments-number">
                        <small>${ns.datetime}</small>
                    </span>
                </div>
                <div class="entry-content">
                    <div style="overflow: hidden;text-overflow: ellipsis;max-height: 15.6em;">${ns.content}</div>
                    <a href="/news/${ns._id}">Baca selengkapnya...</a>
                </div>
            </article>`;
        });
        return new hbs.SafeString(render);
    });
    hbs.registerHelper("newslist", function (news) {
        var render = "";
        news.forEach((ns) => {
            render = render + `<div class="media">
                <div class="media-body">
                    <h4><a href="/news/${ns._id}">${ns.title}</h4>
                </div>
            </div>`;
        });
        return new hbs.SafeString(render);
    });
};
