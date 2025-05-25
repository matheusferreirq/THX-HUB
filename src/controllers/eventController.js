const eventService = require('../services/eventService');

const getAll = async (req, res) => {
    const events = await eventService.getAll();
    res.json(events);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const event = await eventService.getById(id);
    if (event) res.json(event);
    else res.status(404).json( {message: 'Evento não encontrado'});
};

const create = async (req, res) => {
    const event = await eventService.create(req.body);
    res.status(201).json(event)
}

const update = async (req, res) => {
    const { id } = req.params;
    const event = await eventService.update(id, req.body);
    res.json(event);
}

const remove = async (req, res) => {
    const { id } = req.params;
    await eventService.delete(id);
    res.status(204).send();
}

module.exports = { 
    getAll,
    getById, 
    create, 
    update, 
    remove
}