module.exports = function (application) {
    application.get('/logoff', (req, res) => {
        req.session.destroy();
        res.redirect('/login');
    })
}