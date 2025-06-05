const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.get('/', eventController.listView);
router.get('/criar', eventController.createEvent)
router.get('/:id', eventController.getById);
router.post('/', eventController.create);
router.put('/:id', eventController.update);
router.delete('/:id', eventController.remove);

module.exports = router;