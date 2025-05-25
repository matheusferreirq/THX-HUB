const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.post('/:id_evento/mensagens', messageController.create);
router.get('/:id_evento/mensagens', messageController.getAllMensagens);
router.delete('/:id_evento/mensagens/:id_mensagens_evento', messageController.deleteMessage)

module.exports = router;
