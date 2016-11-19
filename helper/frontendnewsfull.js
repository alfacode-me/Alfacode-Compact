module.exports = (hbs) => {
  hbs.registerHelper("frontendnewsfull", function (news) {
    var render = `<div class="posts-content single-post">

                        <article class="post-wrapper">

                          <header class="entry-header-wrapper clearfix sticky">

                            <div class="author-thumb waves-effect waves-light" style="top: 15px; left: 35px">
                              <img src="/src/backend/img/profile/${news.user.img}" alt="${news.user.fullname}">                
                            </div>
                            
                            <div class="entry-header" style="position: relative; left: 100px; padding: 0; margin-bottom: 0; width: 85%;">
                              <h2 class="entry-title">${news.title}</h2>

                              <div class="entry-meta">
                                  <ul class="list-inline">
                                      <li>
                                          <i class="fa fa-user"></i>${news.user.fullname}
                                      </li>

                                      <li>
                                          <i class="fa fa-clock-o"></i>${news.datetime}
                                      </li>
                                  </ul>
                              </div>
                            </div>

                          </header>
                          <hr style="margin-bottom: 20px; margin-top: 10px">
                          <div class="entry-content">
                            ${news.content}
                          </div>

                        </article>

                        <nav class="single-post-navigation" role="navigation">
                          <div class="row">
                            <div class="col-xs-6">
                              <div class="previous-post-link">
                                <a class="waves-effect waves-light" href="/news/${news._id}/before"><i class="fa fa-long-arrow-left"></i>Baca berita sebelumnya</a>
                              </div>
                            </div>

                            <div class="col-xs-6">
                              <div class="next-post-link">
                                <a class="waves-effect waves-light" href="/news/${news._id}/next">Baca berita selanjutnya<i class="fa fa-long-arrow-right"></i></a>
                              </div>
                            </div>
                          </div> 
                        </nav>

                      </div>`;
    return new hbs.SafeString(render);
  });
};