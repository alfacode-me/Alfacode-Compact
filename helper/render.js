module.exports = (hbs) => {
    hbs.registerHelper("render", (content) => {
        return new hbs.SafeString(content);
    })
};