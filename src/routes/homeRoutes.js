const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    res.render('home')
})

router.get('/FAQ', async (req, res) => {
    res.render('faq')
})

module.exports = router;