class HomeController {
    async showHome(req, res) {
        res.render('home')
    }
}

module.exports = HomeController