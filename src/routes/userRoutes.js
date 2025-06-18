const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.post('/cadastro', userController.register);
router.post('/login', userController.login);
router.put('/:id/apelido', userController.updateApelido);
router.put('/:id/nome', userController.updateNome);
router.put('/:id/senha', userController.updateSenha);
router.put('/:id/email', userController.updateEmail);
router.delete('/:id', userController.remove);

module.exports = router;