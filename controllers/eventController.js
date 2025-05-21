const eventService = require('../services/eventService');

const getAll = async (req, res) => {
    const eventos = await eventService.getAllEvents();
    res.json(eventos);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const evento = await eventService.getEventById(id);
    if (evento) res.json(evento);
    else res.status(404).json({message: 'Evento não encontrado'});
};

const create = async (req, res) => {
    const evento = await eventService.createEvent(req.body);
    res.status(201).json(evento);
};

const update = async (req, res) => {
    const { id } = req.params;
    const evento = await eventService.updateEvent(id, req.body);
    res.json(evento)
};

const remove = async (req, res) => {
  const { id } = req.params;
  const evento = await eventService.deleteEvent(id);
  res.json(evento);
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};