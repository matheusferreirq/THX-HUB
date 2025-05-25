const express = require('express');
const router = express.Router();
const organizerController = require('../controllers/organizerController');

router.get('/', organizerController.getAll);
router.get('/evento/:id_evento', organizerController.getByEvento);
router.get('/usuario/:id_usuario', organizerController.getByUsuario);
router.post('/', organizerController.create);
router.put('/:id_usuario/:id_evento', organizerController.updatePapel);
router.delete('/:id_usuario/:id_evento', organizerController.deleteByUsuarioAndEvent);

module.exports = router;
