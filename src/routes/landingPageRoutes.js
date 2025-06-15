const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', async (req, res) => {
  res.render('landingPage.ejs');
});

router.get('/cadastro', userController.showRegisterPage);
router.get('/login', userController.showLoginPage);

module.exports = router;