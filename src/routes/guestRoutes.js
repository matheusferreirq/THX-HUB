const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guestController')

router.get('/:id_evento/convidados', guestController.getAllByEvento);
router.get('/:id_evento/confirmados', guestController.getAllConfirmados);
router.post('/:id_evento/convidados', guestController.invite); // convida para um evento
router.put('/:id_evento/convidados/:id_convidado/confirmar', guestController.confirmAttendence);
router.delete('/:id_evento/convidados/:id_convidado', guestController.removeGuest);

module.exports = router;