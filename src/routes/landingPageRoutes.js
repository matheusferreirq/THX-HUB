const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.render('landingPage.ejs');
});

module.exports = router;